<template>
  <!--  TODO: update grid system-->
  <v-row>
    <v-col cols="12" class="mt-5 text-center">
      <span>Comparisons:</span>
      <v-slider
        v-model="comparisonSlider"
        :tick-labels="[1, 2, 3, 4, 6, 12]"
        :max="6"
        :min="1"
        step="1"
        ticks="always"
        tick-size="1"
        @change="updateComparisons"
      ></v-slider>
    </v-col>
    <v-col
      v-for="(comparison, index) in comparisons"
      :key="index"
      :cols="12 / comparisons.length"
    >
      <v-col cols="12">
        <v-card flat color="transparent">
          <v-card-actions>
            <v-row align="center" justify="center">
              <v-col cols="6" class="text-center">
                <h4>Text Categorization Methods</h4>
                <v-progress-circular
                  v-if="mlMethods.length === 0"
                  :size="50"
                  color="orange"
                  indeterminate
                ></v-progress-circular>
                <v-select
                  v-if="mlMethods.length !== 0"
                  :value="comparison.machineLearning"
                  class="no-overflow"
                  :items="mlMethods"
                  item-text="title"
                  item-value="id"
                  label="Text Categorization Method"
                  @change="commitMLChange.call(this, arguments[0], index)"
                ></v-select>
              </v-col>
              <v-col cols="6" class="text-center">
                <h4>Sentiment Analysis Methods</h4>
                <v-progress-circular
                  v-if="analysisMethods.length === 0"
                  :size="50"
                  color="cyan"
                  indeterminate
                ></v-progress-circular>
                <v-select
                  v-if="analysisMethods.length !== 0"
                  :value="comparison.analysis"
                  class="no-overflow"
                  :items="analysisMethods"
                  item-text="title"
                  item-value="id"
                  label="Sentiment Analysis Methods"
                  @change="
                    commitAnalysisMethodChange.call(this, arguments[0], index)
                  "
                ></v-select>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="text-center" cols="12">
        <sankey-diagram-wrapper
          :id="charts.sankey.id + '-comparison-' + index"
          :ref="'comparison-' + index"
          :div-id="charts.sankey.divId + '-comparison-' + index"
          :label="index + 1 + ' - ' + charts.sankey.label"
          :width="charts.sankey.width"
          :height="charts.sankey.height"
          :color="color"
          :flat="flat"
          :topics="topics"
          :selected-ml-method="comparison.machineLearning"
          :dataset="aggregatedTopics"
          @itemClick="updateSelectedTopic"
          @itemMouseover="applyHighlight"
          @itemMouseout="removeHighlight"
        ></sankey-diagram-wrapper>
      </v-col>
      <v-col class="text-center" cols="12">
        <heat-map-wrapper
          :id="charts.heatmap.id + '-comparison-' + index"
          :div-id="charts.heatmap.divId + '-comparison-' + index"
          :label="index + 1 + ' - ' + charts.heatmap.label"
          :width="charts.heatmap.width"
          :height="charts.heatmap.height"
          :selected-analysis-method="comparison.analysis"
          :selected-machine-learning-method="comparison.machineLearning"
          :selected-topic="comparison.topic"
          :color="color"
          :flat="flat"
          :dataset="aggregatedKeywords"
        ></heat-map-wrapper>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import ScatterPlotWrapper from '../components/Scatterplot/ScatterPlotWrapper'
import HeatMapWrapper from '../components/Heatmap/HeatMapWrapper'
import SankeyDiagramWrapper from '../components/Sankey/SankeyDiagramWrapper'

export default {
  name: 'PageCompare',
  components: {
    'sankey-diagram-wrapper': SankeyDiagramWrapper,
    // eslint-disable-next-line vue/no-unused-components
    'scatter-plot-wrapper': ScatterPlotWrapper,
    'heat-map-wrapper': HeatMapWrapper,
  },
  data() {
    return {
      flat: true,
      selectedTopic: '',
      color: 'transparent',
      msg: '',
      temp: [],
      // Charts and all of their configurations
      charts: {
        scatterplot: {
          id: 'scatter-plot',
          divId: 'scatter-plot-div',
          label: 'User Influence Vs. Average Sentiment',
          width: 600,
          height: 300,
        },
        sankey: {
          id: 'sankey-diagram',
          divId: 'sankey-diagram-div',
          label: 'User Categories, Topics, and Content Themes',
          width: 600,
          height: 400,
        },
        heatmap: {
          id: 'heatmap',
          divId: 'heatmap-div',
          label: 'Hybrid Analysis',
          width: 600,
          height: 400,
        },
        tweets: {
          user: {},
          tweets: [],
          avgSentiment: 0,
          influence: 0,
        },
      },
      // Data required for connection metrics
      pingPong: {
        start: 0,
        end: 0,
        busy: false,
        history: [],
      },
    }
  },
  computed: {
    /*
     * dataset containing the tweets
     */
    aggregatedTopics() {
      return this.$store.state.aggregatedTopics
    },
    aggregatedUsers() {
      return this.$store.state.aggregatedUsers
    },
    aggregatedKeywords() {
      return this.$store.state.aggregatedKeywords
    },
    topics() {
      return this.$store.state.topics
    },
    comparisonSlider: {
      set(val) {
        this.$store.commit('compare/setComparisonSlider', val)
      },
      get() {
        return this.$store.state.compare.comparisonSlider
      },
    },
    comparisons: {
      set(val) {
        this.$store.commit('compare/setComparisons', val)
      },
      get() {
        return this.$store.state.compare.comparisons
      },
    },
    analysisMethods() {
      return this.aggregatedUsers.map((cat) => {
        return {
          id: cat._id,
          title: cat.items[0].analysis.title,
        }
      })
    },
    mlMethods() {
      return this.aggregatedTopics.group_topics.map((cat) => {
        return {
          id: cat._id,
          title: cat.items[0].labels.title,
        }
      })
    },
    /*
     * Current delay in ms
     */
    delay() {
      if (this.pingPong.busy)
        if (this.pingPong.history.length > 0)
          return this.pingPong.history[this.pingPong.history.length - 1]
        else return 0
      return this.pingPong.end - this.pingPong.start
    },
    /*
     * Current average delay in ms
     */
    avgDelay() {
      let avg = 0
      for (const num of this.pingPong.history) avg += num
      avg = (10 * avg) / (this.pingPong.history.length * 10)
      return avg
    },
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.resize()
  },
  updated() {
    this.resize()
  },
  methods: {
    resize() {
      for (const index in this.comparisons) {
        const scatterDiv = document.getElementById(
          this.charts.scatterplot.divId + '-comparison-' + index
        )
        const heatDiv = document.getElementById(
          this.charts.heatmap.divId + '-comparison-' + index
        )
        const sankeyDiv = document.getElementById(
          this.charts.sankey.divId + '-comparison-' + index
        )
        if (scatterDiv)
          this.charts.scatterplot.width = scatterDiv.clientWidth - 5
        if (heatDiv) this.charts.heatmap.width = heatDiv.clientWidth - 5
        if (sankeyDiv) this.charts.sankey.width = sankeyDiv.clientWidth - 5
      }
    },
    commitMLChange(MLid, index) {
      this.$store.commit('compare/updateComparisonML', {
        index,
        value: MLid,
      })
    },
    commitAnalysisMethodChange(MLid, index) {
      this.$store.commit('compare/updateComparisonAnalysis', {
        index,
        value: MLid,
      })
    },
    updateTweets(data) {
      this.charts.tweets.user = data.user
      this.charts.tweets.tweets = data.tweets
      this.charts.tweets.avgSentiment = data.y
      this.charts.tweets.influence = data.x
    },
    updateComparisons(count) {
      this.$store.commit('compare/updateComparisons', count)
    },
    highlightTopic(item) {
      if (this.topics.map((a) => a.id).includes(item.id)) {
        for (const comparison of this.comparisons) {
          comparison.topic = item.id
        }
      }
    },
    updateSelectedTopic(item) {
      if (this.topics.map((a) => a.id).includes(item.id)) {
        this.selectedTopic = item.id
        this.highlightTopic(item)
      }
    },
    applyHighlight(item) {
      for (const index of Object.keys(this.$refs)) {
        const comps = this.$refs[index]
        for (const comp of comps) comp.applyHighlight(item)
      }
      this.highlightTopic(item)
    },
    removeHighlight(item) {
      for (const index of Object.keys(this.$refs)) {
        const comps = this.$refs[index]
        for (const comp of comps) comp.removeHighlight(item)
      }
      this.highlightTopic({ id: this.selectedTopic })
    },
  },
}
</script>

<style scoped>
.no-overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
