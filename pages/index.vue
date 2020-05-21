<template>
  <v-row justify="center" align="center">
    <v-col class="text-center" cols="12">
      <v-card flat color="transparent">
        <v-card-text>
          <h1 class="display-1">Welcome to VARTTA</h1>
          <h2 class="title">
            VARTTA: Visual Analytics for Real-Time Twitter datA. <br />
          </h2>
          <p>To start, please select one of the following scenarios.</p>
          <p>
            Citation:
            <a href="https://www.mdpi.com/2306-5729/5/1/20"
              >Haghighati, A.; Sedig, K. VARTTA: A Visual Analytics System for
              Making Sense of Real-Time Twitter Data. Data 2020, 5, 20.</a
            >
          </p>
          <h4>
            Please note that this is a work in progress. This version is under
            heavy developments :)
          </h4>
          <p>
            Find a bug? Please report it on the Github
            <a
              href="https://github.com/InsightfulSummer/vartta-web/issues"
              target="_blank"
              title="contribute"
              >issue board</a
            >.
          </p>
          <p>
            &copy;<a href="http://insight.uwo.ca">Insight Lab</a> at
            <a href="https://uwo.ca">Western</a>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-for="(scenario, index) in scenarios" :key="index" cols="12" md="4">
      <v-hover>
        <v-card slot-scope="{ hover }" class="mx-auto" max-width="600">
          <v-img :aspect-ratio="16 / 9" :src="scenario.cloud">
            <v-expand-transition>
              <div
                v-if="
                  selectedScenario !== null &&
                  selectedScenario.id !== scenario.id
                "
                class="d-flex text-center transition-fast-in-fast-out grey darken-2 v-card--reveal--disconnected display-3 white--text"
                style="height: 100%;"
              >
                Another scenario is selected...
              </div>
              <div
                v-else-if="hover"
                :class="
                  'd-flex text-xs-center transition-fast-in-fast-out darken-2 v-card--reveal display-3 white--text ' +
                  scenario.color
                "
                style="height: 100%;"
              >
                {{
                  selectedScenario !== null
                    ? selectedScenario.id === scenario.id
                      ? 'Pause'
                      : 'Start'
                    : 'Start'
                }}
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text class="pt-4" style="position: relative;">
            <v-btn
              absolute
              :color="scenario.color"
              class="white--text"
              fab
              large
              right
              top
              :disabled="(selectedScenario !== null && selectedScenario.id !== scenario.id)"
              @click.stop="toggleConsuming(scenario)"
            >
              <v-icon>
                mdi-{{
                  selectedScenario !== null
                    ? selectedScenario.id === scenario.id
                      ? 'pause'
                      : 'power'
                    : 'power'
                }}
              </v-icon>
            </v-btn>
            <h3
              :class="
                'display-1 font-weight-light mb-2 ' + scenario.color + '--text'
              "
            >
              {{ scenario.title }}
            </h3>
            <div class="font-weight-light title mb-2">
              {{ scenario.subtitle }}
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
    <v-col cols="12" md="6">
      <v-hover>
        <v-card slot-scope="{ hover }" class="mx-auto" max-width="600">
          <v-img :aspect-ratio="16 / 9" src="/form.png">
            <v-expand-transition>
              <div
                v-if="disconnected"
                class="d-flex text-center transition-fast-in-fast-out grey darken-2 v-card--reveal--disconnected display-3 white--text"
                style="height: 100%;"
              >
                Disconnected
              </div>
              <div
                v-else-if="selectedScenario && selectedScenario.id !== ''"
                class="d-flex text-center transition-fast-in-fast-out grey darken-2 v-card--reveal--disconnected display-3 white--text"
                style="height: 100%;"
              >
                Another scenario is selected...
              </div>
              <div
                v-else-if="hover"
                class="d-flex text-center transition-fast-in-fast-out darken-2 v-card--reveal display-3 white--text primary"
                style="height: 100%;"
              >
                Start
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text class="pt-4" style="position: relative;">
            <v-btn
              absolute
              color="primary"
              class="white--text"
              fab
              large
              right
              top
              :disabled="
                disconnected || (selectedScenario && selectedScenario.id !== '')
              "
              :loading="disconnected"
              @click.stop=""
            >
              <v-icon>mdi-cloud-upload</v-icon>
            </v-btn>
            <h3 class="display-1 font-weight-light mb-2 primary--text">
              Custom Scenario
            </h3>
            <div class="font-weight-light title mb-2">
              You need to be connected to server...
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import socket from '../lib/socket.io'
export default {
  name: 'PageIndex',
  components: {},
  data() {
    return {
      disconnected: socket.disconnected,
      topics: null,
      scenarios: [
        {
          id: 'phealth',
          title: 'Public Health',
          subtitle:
            'Causes of mortality, diseases, natural disasters, and more',
          color: 'orange',
          cloud: '/samples/phealth/cloud.png',
        },
        {
          id: 'smartcity',
          title: 'Smart City / Urban Planning',
          subtitle: "Citizens' comments about urban spaces...",
          color: 'blue',
          cloud: '/samples/smartcity/cloud.png',
        },
        {
          id: 'politics',
          title: 'U.S. Elections',
          subtitle: 'Debates about policies, political parties, and more',
          color: 'purple',
          cloud: '/samples/politics/cloud.png',
        },
      ],
    }
  },
  computed: {
    selectedScenario: {
      set(val) {
        this.$store.commit('updateSelectedScenario', val)
      },
      get() {
        return this.$store.state.selectedScenario
      },
    },
  },
  beforeMount() {
    socket.on('reconnecting', (data) => {
      this.disconnected = socket.disconnected
    })
    socket.on('connect', (data) => {
      this.disconnected = socket.disconnected
    })
  },

  methods: {
    toggleConsuming(scenario) {
      // Was not already consuming streams or was consuming another stream
      if (this.selectedScenario === null) {
        this.$store.dispatch('reset')
        this.$store.dispatch('analytics/reset')
        this.$store.dispatch('compare/reset')
        this.$store.dispatch('shuffler/reset')
        this.$store.dispatch('triage/reset')
        this.$store.commit('updateSelectedScenario', scenario)
        this.$store.dispatch('fetchData', {
          agtopics:
            'http://localhost:3000/samples/' + scenario.id + '/agtopics.json',
          agusers:
            'http://localhost:3000/samples/' + scenario.id + '/agusers.json',
          agkeywords:
            'http://localhost:3000/samples/' + scenario.id + '/agkeywords.json',
          tweets:
            'http://localhost:3000/samples/' + scenario.id + '/tweets.json',
          users: 'http://localhost:3000/samples/' + scenario.id + '/users.json',
          topics:
            'http://localhost:3000/samples/' + scenario.id + '/topics.json',
        })
        // eslint-disable-next-line no-console
        console.log('Starting with fresh data...')
        socket.emit('pause_consuming')
        socket.emit('update_channels', this.$store.state.topics)
        socket.emit('initial_data_request', {})
      } else {
        this.$store.dispatch('reset')
        this.$store.dispatch('analytics/reset')
        this.$store.dispatch('compare/reset')
        this.$store.dispatch('shuffler/reset')
        this.$store.dispatch('triage/reset')
        socket.emit('pause_consuming')
      }
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none !important;
}
.v-card--reveal--disconnected {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
