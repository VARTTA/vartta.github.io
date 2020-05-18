<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center">
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <div :id="charts.topicUserDiagram.id">
          <v-btn
            @click="
              charts.topicUserDiagram.sunburst = !charts.topicUserDiagram
                .sunburst
            "
          >
            Topic/Keyword
          </v-btn>
          <topic-user
            :meta="charts.topicUserDiagram"
            :topics="topics"
            :users="usersSet"
          ></topic-user>
        </div>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <div :id="charts.concentricChart.id">
          <v-btn
            @click="
              charts.concentricChart.tracks =
                charts.concentricChart.tracks < 10
                  ? charts.concentricChart.tracks + 1
                  : 1
            "
          >
            NUMBER OF TRACKS {{ charts.concentricChart.tracks }}
          </v-btn>
          <v-radio-group
            v-model="charts.concentricChart.timeUnit"
            :mandatory="false"
          >
            <v-radio label="Yearly" value="12"></v-radio>
            <v-radio label="Monthly" value="30"></v-radio>
            <v-radio label="Weekly" value="7"></v-radio>
            <v-radio label="Daily" value="24"></v-radio>
            <v-radio label="Hourly" value="60"></v-radio>
          </v-radio-group>
          <concentric-chart
            :meta="charts.concentricChart"
            :topics="topics"
            :users="usersSet"
            :number-of-tracks="charts.concentricChart.tracks"
          ></concentric-chart>
        </div>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <div :id="charts.userSimilarity.id">
          <v-btn
            @click="
              charts.userSimilarity.tracks =
                charts.userSimilarity.tracks < 4
                  ? charts.userSimilarity.tracks + 1
                  : 1
            "
          >
            NUMBER OF Neighbors {{ charts.userSimilarity.tracks }}
          </v-btn>
          <v-btn
            @click="
              charts.userSimilarity.adjacency = !charts.userSimilarity.adjacency
            "
          >
            Adjacency
          </v-btn>
          <user-similarity
            :meta="charts.userSimilarity"
            :topics="topics"
            :users="usersSet"
            :number-of-tracks="charts.userSimilarity.tracks"
          ></user-similarity>
        </div>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <!--        <treemap :users="usersSet"></treemap>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TopicUser from '../components/Triage/TopicUserAssociationDiagram'
import ConcentricChart from '../components/Triage/ConcentricChart'
import UserSimilarity from '../components/Triage/UserSimilarity'
// import Treemap from '../components/Treemap/Treemap'
export default {
  name: 'Triage',
  components: {
    UserSimilarity,
    TopicUser,
    ConcentricChart,
    // Treemap,
  },
  data() {
    return {
      usersSet: [
        {
          screen_name: 'a',
          w2v: 1,
          tweets: [
            {
              id: 2,
              keywords: ['Adam Kokesh'],
              topics: ['libertarian'],
              created_at: 'Thu May 15 15:20:20 +0000 2020',
            },
            {
              id: 31,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Mar 14 13:24:15 +0000 2020',
            },
            {
              id: 32,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Mar 14 13:24:15 +0000 2020',
            },
            {
              id: 33,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Mar 14 13:24:15 +0000 2020',
            },
            {
              id: 34,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Mar 14 13:24:15 +0000 2020',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'b',
          w2v: 2,
          tweets: [
            {
              id: 4,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon May 13 15:24:15 +0000 2020',
            },
            {
              id: 5,
              keywords: ['Adam Kokesh'],
              topics: ['libertarian'],
              created_at: 'Thu May 14 19:21:20 +0000 2020',
            },
            {
              id: 51,
              keywords: ['Adam Kokesh'],
              topics: ['libertarian'],
              created_at: 'Thu Apr 1 20:20:20 +0000 2020',
            },
            {
              id: 52,
              keywords: ['Adam Kokesh'],
              topics: ['libertarian'],
              created_at: 'Thu May 2 03:20:20 +0000 2020',
            },
            {
              id: 53,
              keywords: ['Adam Kokesh'],
              topics: ['libertarian'],
              created_at: 'Thu Mar 13 13:18:20 +0000 2020',
            },
            {
              id: 54,
              keywords: ['Booker'],
              topics: ['democraticn'],
              created_at: 'Thu Feb 18 19:18:20 +0000 2020',
            },
            {
              id: 55,
              keywords: ['Cory Booker'],
              topics: ['democratic'],
              created_at: 'Thu May 12 19:18:20 +0000 2019',
            },
            {
              id: 55,
              keywords: ['Adam Kokesh'],
              topics: ['libertarian'],
              created_at: 'Thu Feb 14 19:18:20 +0000 2018',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'c',
          w2v: 3,
          tweets: [
            {
              id: 7,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
            {
              id: 8,
              keywords: ['Adam Kokesh'],
              topics: ['libertarian'],
              created_at: 'Thu Mar 11 19:20:20 +0000 2017',
            },
            {
              id: 9,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Jan 2 15:24:15 +0000 2020',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'd',
          w2v: 4,
          tweets: [
            {
              id: 10,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2019',
            },
            {
              id: 11,
              keywords: ['Adam Kokesh'],
              topics: ['libertarian'],
              created_at: 'Thu Mar 11 19:20:20 +0000 2019',
            },
            {
              id: 12,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Jan 2 15:24:15 +0000 2020',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'e',
          w2v: 1,
          tweets: [
            {
              id: 13,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2019',
            },
            {
              id: 14,
              keywords: ['Adam Kokesh'],
              topics: ['libertarian'],
              created_at: 'Thu Mar 11 19:20:20 +0000 2018',
            },
            {
              id: 15,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Jan 2 15:24:15 +0000 2018',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'f',
          w2v: 2,
          tweets: [
            {
              id: 16,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2019',
            },
            {
              id: 17,
              keywords: ['Adam Kokesh'],
              topics: ['libertarian'],
              created_at: 'Thu Mar 11 19:20:20 +0000 2019',
            },
            {
              id: 18,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Jan 30 15:24:15 +0000 2020',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'g',
          w2v: 6,
          tweets: [
            {
              id: 19,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2019',
            },
            {
              id: 20,
              keywords: ['Adam Kokesh'],
              topics: ['libertarian'],
              created_at: 'Thu Mar 11 19:20:20 +0000 2017',
            },
            {
              id: 21,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Jan 2 15:24:15 +0000 2020',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'h',
          w2v: 1,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
            {
              id: 23,
              keywords: ['Adam Kokesh'],
              topics: ['libertarian'],
              created_at: 'Thu Mar 12 18:20:20 +0000 2020',
            },
            {
              id: 24,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Jan 2 15:24:15 +0000 2020',
            },
            {
              id: 25,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Jan 2 15:24:15 +0000 2020',
            },
            {
              id: 26,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Jan 2 15:24:15 +0000 2020',
            },
            {
              id: 27,
              keywords: ['IMPOTUS'],
              topics: ['impeachment'],
              created_at: 'Thu Jan 2 15:24:15 +0000 2020',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'i',
          w2v: 1,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'j',
          w2v: 1,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'k',
          w2v: 1,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'l',
          w2v: 1,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'm',
          w2v: 1,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'n',
          w2v: 1,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'o',
          w2v: 1,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'p',
          w2v: 4,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'q',
          w2v: 2,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'r',
          w2v: 4,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 's',
          w2v: 3,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 't',
          w2v: 5,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'u',
          w2v: 2,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'v',
          w2v: 1,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'w',
          w2v: 3,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'x',
          w2v: 1,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'y',
          w2v: 2,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
        {
          screen_name: 'z',
          w2v: 4,
          tweets: [
            {
              id: 22,
              keywords: ['democrats'],
              topics: ['democratic'],
              created_at: 'Mon Dec 13 15:24:15 +0000 2014',
            },
          ],
          selected: false,
        },
      ],
      flat: true,
      color: 'transparent',
      highlightedTopic: '',
      msg: '',
      temp: [],
      selectedUser: { screen_name: '' },
      // Charts and all of their configurations
      charts: {
        topicUserDiagram: {
          id: 'topic-user-diagram',
          label: 'Agent-Topic Association ',
          width: 600,
          height: 1000,
          sunburst: false,
        },
        concentricChart: {
          id: 'concentric-chart',
          label: 'Agent-Time Association ',
          width: 600,
          height: 1000,
          padding: { top: 20, bottom: 0, left: 0, right: 0 },
          tracks: 3,
          timeUnit: '12',
        },
        userSimilarity: {
          id: 'user-similarity',
          label: 'Agents Similarity',
          width: 600,
          height: 1000,
          padding: { top: 20, bottom: 0, left: 0, right: 0 },
          tracks: 3,
          focalUser: 0,
          adjacency: false,
        },
      },
    }
  },
  computed: {
    topics: {
      set(val) {
        this.$store.commit('topics', val)
      },
      get() {
        return this.$store.state.topics
      },
    } /*,
     usersSet: {
      set(val) {
        this.$store.commit('triage/updateUsersSet', val)
      },
      get() {
        return this.$store.state.triage.usersSet
      },
    }, */,
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      const chordDiv = document.getElementById(this.charts.topicUserDiagram.id)
      const concentricDiv = document.getElementById(
        this.charts.concentricChart.id
      )
      if (chordDiv) {
        this.charts.topicUserDiagram.width = chordDiv.clientWidth - 5
      }
      if (concentricDiv) {
        this.charts.concentricChart.width = concentricDiv.clientWidth - 5
      }
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
