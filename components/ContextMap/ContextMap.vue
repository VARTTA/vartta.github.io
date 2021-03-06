<template>
  <svg
    :id="chartDomID + '-svg'"
    :width="width"
    :height="height"
    class="svg heatmap"
  >
    <defs>
      <pattern
        v-for="(item, index) in dataset"
        :id="item.user.screen_name"
        :key="index + '-' + item.user.screen_name + '-image'"
        patternContentUnits="objectBoundingBox"
        height="100%"
        width="100%"
      >
        <image
          width="1"
          height="1"
          preserveAspectRatio="none"
          :xlink:href="item.user.profile_image_url_https"
        ></image>
      </pattern>
    </defs>
    <transition-group
      id="rects"
      tag="g"
      name="fade"
      :duration="transitionDuration"
    >
      <circle
        v-for="(item, index) in dataset"
        :id="'svg_circle_' + item.user.screen_name"
        :key="item.id_str + index"
        :cx="
          xScale(Object.keys(item[axesMeta.x.selector])[0]) +
            xScale.bandwidth() / 2
        "
        :cy="yScale(yIndex(item)) + yScale.bandwidth() / 2"
        r="19"
        :fill="'url(#' + item.user.screen_name + ')'"
        :stroke="item.hover ? 'orange' : item.exam ? 'red' : ''"
        :stroke-width="item.hover || item.exam ? '3' : '0'"
        class="circle"
        @click="
          data => {
            tweetClicked.call({}, data, item)
          }
        "
        @mouseover="
          data => {
            mouseover.call({}, data, item)
          }
        "
        @mouseleave="
          data => {
            mouseleave.call({}, data, item)
          }
        "
      ></circle>
    </transition-group>
    <g
      :class="'x-axis heatmap-' + chartDomID + '-x-axis'"
      :transform="'translate(0,' + chartTop + ')'"
    ></g>
    <g
      :class="'y-axis heatmap-' + chartDomID + '-y-axis'"
      :transform="'translate(' + chartLeft + ', 0)'"
    ></g>
  </svg>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'ContextMap',
  props: {
    chartDomID: {
      type: String,
      default: 'heat-map'
    },
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    dataset: {
      type: Array,
      default: function() {
        return []
      }
    },
    topics: {
      type: Array,
      default: function() {
        return []
      }
    },
    colorRange: {
      type: Array,
      default: function() {
        return ['#d7ffdb', '#006c03']
      }
    },
    padding: {
      type: Object,
      default: function() {
        return {
          top: 150,
          right: 5,
          left: 5,
          bottom: 5
        }
      }
    },
    axesMeta: {
      type: Object,
      default: function() {
        return {
          x: {
            selector: 'topics',
            scaleToContent: true,
            zoomEnabled: false,
            label: 'Topics',
            show: true
          },
          y: {
            selector: 'y',
            initialBound: [1, 5],
            scaleToContent: false,
            zoomEnabled: false,
            label: '',
            show: false
          }
        }
      }
    }
  },
  data() {
    return {
      svg: null,
      circlesGroup: null,
      axes: {
        x: {
          padding: 0.01,
          element: null
        },
        y: {
          padding: 0.01,
          element: null
        }
      },
      transitionDuration: 500
    }
  },
  computed: {
    chartLeft: function() {
      return this.padding.left
    },
    chartRight: function() {
      return this.width - this.padding.right
    },
    chartBottom: function() {
      return this.height - this.padding.bottom
    },
    chartTop: function() {
      return this.padding.top
    },
    chartHeight: function() {
      return this.chartBottom - this.chartTop
    },
    chartWidth: function() {
      return this.chartRight - this.chartLeft
    },
    xScale: function() {
      return d3
        .scaleBand()
        .domain(this.topics)
        .range([this.chartLeft, this.chartRight])
        .padding(this.axes.x.padding)
    },
    yScale: function() {
      return d3
        .scaleBand()
        .domain([0, 1, 2, 3])
        .range([this.chartTop, this.chartBottom])
        .padding(this.axes.y.padding)
    },
    colorScale: function() {
      return d3
        .scaleLinear()
        .range(this.colorRange)
        .domain([
          d3.min(this.dataset, function(d) {
            return d.v
          }),
          d3.max(this.dataset, function(d) {
            return d.v
          })
        ])
    },
    xAxisFunction: function() {
      return d3.axisTop(this.xScale)
    },
    yAxisFunction: function() {
      return d3.axisLeft(this.yScale)
    },
    groupedTweets: function() {
      return channel => {
        return this.dataset.filter(a => Object.keys(a.topics).includes(channel))
      }
    },
    yIndex: function() {
      return tweet => {
        return this.groupedTweets(Object.keys(tweet.topics)[0]).findIndex(
          a => a.id_str === tweet.id_str
        )
      }
    }
  },
  beforeUpdate() {
    // re-draw axes
    this.drawAxes()
  },
  mounted() {
    // Setup the SVG and Groups
    this.setupSVG()
  },
  methods: {
    setupSVG: function() {
      // Select the SVG element
      this.svg = d3.select('.heatmap')
      this.circlesGroup = d3.select('#rects')
      this.axes.x.element = d3.select('.heatmap-' + this.chartDomID + '-x-axis')
      this.axes.y.element = d3.select('.heatmap-' + this.chartDomID + '-y-axis')
    },
    drawAxes: function() {
      const that = this
      // Draw X axis
      if (this.topics.length > 0) {
        this.axes.x.element
          .call(this.xAxisFunction)
          .selectAll('text')
          .attr('class', 'body-2')
          .attr('dx', '-1em')
          .attr('dy', '0em')
          .attr('y', '4')
          .attr('transform', 'rotate(+90)')
          .style('text-anchor', 'end')
        this.axes.x.element
          .selectAll('.tick')
          .style('cursor', 'pointer')
          .on('click', d => {
            that.$emit('topicSelected', d)
          })
      }
      // Draw Y axis
      // this.axes.y.element
      //   .call(this.yAxisFunction)
      //   .selectAll('text')
      //   .attr('class', 'body-2')
    },
    tweetClicked: function(data, tweet) {
      this.$emit('tweetClicked', tweet)
    },
    mouseover: function(data, tweet) {
      tweet.hover = true
      // eslint-disable-next-line no-console
      console.log(tweet.hover)
    },
    mouseleave: function(data, tweet) {
      tweet.hover = false
      // eslint-disable-next-line no-console
      console.log(tweet.hover)
    }
  }
}
</script>

<style scoped>
.svg {
  /*background: lightgrey;*/
}

.x-axis >>> .tick,
.y-axis >>> .tick {
  font-family: 'Roboto', sans-serif;
}

.circle {
  transition: all 500ms;
}

.fade-enter-active {
  fill: green;
}

.fade-leave-active {
  fill: brown;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
