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
            :users="userSet"
            :selected-list="allSelected"
            @userSelected="updateSelectedUsers"
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
            :users="userSet"
            :number-of-tracks="charts.concentricChart.tracks"
            :selected-list="allSelected"
            @candidSelected="updateSelectedCandid"
          ></concentric-chart>
        </div>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <div :id="charts.userSimilarity.id">
          <div>
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
          </div>
          <div></div>
          <div>
            <v-btn
              @click="
                charts.userSimilarity.adjacency = !charts.userSimilarity
                  .adjacency
              "
            >
              Adjacency
            </v-btn>
          </div>
          <user-similarity
            :meta="charts.userSimilarity"
            :topics="topics"
            :users="userSet"
            :selected-list="allSelected"
            :number-of-tracks="charts.userSimilarity.tracks"
            :last-selected="lastSelectedUser"
            @neighborSelected="updateSelectedUsers"
          ></user-similarity>
        </div>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col class="text-center" cols="12" md="4">
        <user-info
          :selected-list="allSelected"
          :last-selected="lastSelectedUser"
          @removeFromPile="removeSelected"
          @searchClicked="updateLastSelect"
        ></user-info>
      </v-col>
    </v-row>
    <v-row justify="center"></v-row>
  </v-container>
</template>

<script>
import TopicUser from '../components/Triage/TopicUserAssociationDiagram'
import ConcentricChart from '../components/Triage/ConcentricChart'
import UserSimilarity from '../components/Triage/UserSimilarity'
import UserInfo from '../components/Triage/UserInfo'
export default {
  name: 'Triage',
  components: {
    UserInfo,
    UserSimilarity,
    TopicUser,
    ConcentricChart,
    // Treemap,
  },
  data() {
    return {
      /* usersRawSet: [
        {
          id: 2382499392,
          w2v: 7,
          id_str: '2382499392',
          name: 'Eric Edwards',
          screen_name: 'UCFONEBIGOHANA',
          location: null,
          url: null,
          description: null,
          translator_type: 'none',
          protected: false,
          verified: false,
          followers_count: 197,
          friends_count: 239,
          listed_count: 11,
          favourites_count: 2796,
          statuses_count: 36245,
          created_at: 'Mon Mar 10 18:16:46 +0000 2014',
          utc_offset: null,
          time_zone: null,
          geo_enabled: true,
          lang: null,
          contributors_enabled: false,
          is_translator: false,
          profile_background_color: 'C0DEED',
          profile_background_image_url:
            'http://abs.twimg.com/images/themes/theme1/bg.png',
          profile_background_image_url_https:
            'https://abs.twimg.com/images/themes/theme1/bg.png',
          profile_background_tile: false,
          profile_link_color: '1DA1F2',
          profile_sidebar_border_color: 'C0DEED',
          profile_sidebar_fill_color: 'DDEEF6',
          profile_text_color: '333333',
          profile_use_background_image: true,
          profile_image_url:
            'http://pbs.twimg.com/profile_images/1158453145808318465/y7T4kW4l_normal.jpg',
          profile_image_url_https:
            'https://pbs.twimg.com/profile_images/1158453145808318465/y7T4kW4l_normal.jpg',
          profile_banner_url:
            'https://pbs.twimg.com/profile_banners/2382499392/1566417560',
          default_profile: true,
          default_profile_image: false,
          following: null,
          follow_request_sent: null,
          notifications: null,
          tweets: [
            {
              keywords: ['tom steyer'],
              analysis: [
                {
                  id: 'ibm',
                  title: 'IBM Natural Language Understanding API',
                  result: 0,
                  meta: {
                    usage: {
                      text_units: 1,
                      text_characters: 127,
                      features: 5,
                    },
                    sentiment: {
                      document: {
                        score: 0,
                        label: 'neutral',
                      },
                    },
                    semantic_roles: [
                      {
                        subject: {
                          text:
                            'cuomoprimetime the sixword argument for term limits mitch mcconnell lindsey graham ted cruz tom steyer',
                          keywords: [
                            {
                              text: 'mcconnell lindsey graham',
                            },
                            {
                              text: 'cruz tom steyer',
                            },
                            {
                              text: 'sixword argument',
                            },
                            {
                              text: 'term limits',
                            },
                          ],
                          entities: [
                            {
                              type: 'Person',
                              text: 'tom steyer',
                              disambiguation: {
                                subtype: [],
                                name: 'Tom Steyer',
                                dbpedia_resource:
                                  'http://dbpedia.org/resource/Tom_Steyer',
                              },
                            },
                          ],
                        },
                        sentence:
                          'cuomoprimetime the sixword argument for term limits mitch mcconnell lindsey graham ted cruz tom steyer argues that term limits…',
                        object: {
                          text: 'that term limits…',
                          keywords: [
                            {
                              text: 'term limits…',
                            },
                          ],
                        },
                        action: {
                          verb: {
                            text: 'argue',
                            tense: 'present',
                          },
                          text: 'argues',
                          normalized: 'argue',
                        },
                      },
                    ],
                    language: 'en',
                    keywords: [
                      {
                        text: 'term limits',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.996718,
                        emotion: {
                          sadness: 0.547127,
                          joy: 0.070939,
                          fear: 0.086786,
                          disgust: 0.028962,
                          anger: 0.287989,
                        },
                        count: 2,
                      },
                      {
                        text: 'sixword argument',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.883363,
                        emotion: {
                          sadness: 0.547127,
                          joy: 0.070939,
                          fear: 0.086786,
                          disgust: 0.028962,
                          anger: 0.287989,
                        },
                        count: 1,
                      },
                      {
                        text: 'cuomoprimetime',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.050536,
                        emotion: {
                          sadness: 0.547127,
                          joy: 0.070939,
                          fear: 0.086786,
                          disgust: 0.028962,
                          anger: 0.287989,
                        },
                        count: 1,
                      },
                    ],
                    entities: [
                      {
                        type: 'Person',
                        text: 'tom steyer',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.33,
                        emotion: {
                          sadness: 0.547127,
                          joy: 0.070939,
                          fear: 0.086786,
                          disgust: 0.028962,
                          anger: 0.287989,
                        },
                        disambiguation: {
                          subtype: [],
                          name: 'Tom Steyer',
                          dbpedia_resource:
                            'http://dbpedia.org/resource/Tom_Steyer',
                        },
                        count: 1,
                      },
                    ],
                    concepts: [
                      {
                        text: 'Mitch McConnell',
                        relevance: 0.949819,
                        dbpedia_resource:
                          'http://dbpedia.org/resource/Mitch_McConnell',
                      },
                      {
                        text: 'Jon Kyl',
                        relevance: 0.792609,
                        dbpedia_resource: 'http://dbpedia.org/resource/Jon_Kyl',
                      },
                      {
                        text:
                          'United States Senate Committee on Rules and Administration',
                        relevance: 0.697147,
                        dbpedia_resource:
                          'http://dbpedia.org/resource/United_States_Senate_Committee_on_Rules_and_Administration',
                      },
                    ],
                    warnings: ['emotion: cannot locate keyphrase'],
                  },
                },
                {
                  id: 'naturaljs-afinn165',
                  title: 'Natural JS Library - AFINN-165 Vocab.',
                  result: -0.021052631578947368,
                },
                {
                  id: 'naturaljs-senticon',
                  title: 'Natural JS Library - SENTICON Vocab.',
                  result: 0.006589473684210527,
                },
                {
                  id: 'naturaljs-pattern',
                  title: 'Natural JS Library - PATTERN Vocab.',
                  result: 0,
                },
                {
                  id: 'sentimentjs',
                  title: 'Sentiment JS Library',
                  result: -0.010526315789473684,
                  meta: {
                    score: -1,
                    comparative: -0.05263157894736842,
                    tokens: [
                      'cuomoprimetime',
                      'the',
                      'sixword',
                      'argument',
                      'for',
                      'term',
                      'limits',
                      'mitch',
                      'mcconnell',
                      'lindsey',
                      'graham',
                      'ted',
                      'cruz',
                      'tom',
                      'steyer',
                      'argues',
                      'that',
                      'term',
                      'limits…',
                    ],
                    words: ['limits'],
                    positive: [],
                    negative: ['limits'],
                  },
                },
              ],
              labels: [
                {
                  id: 'LSTM',
                  title: 'Long Short-Term Memory Model',
                  result: {
                    theme: 'unrelated',
                    group: 'public',
                  },
                },
                {
                  id: 'CNN',
                  title: 'Convolutional Neural Network Model',
                  result: {
                    theme: 'unrelated',
                    group: 'public',
                  },
                },
                {
                  id: 'SVM',
                  title: 'Support Vector Machine',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'KNN',
                  title: 'K-nearest Neighbors',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'RF',
                  title: 'Random Forests',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'MLP',
                  title: 'Multilayer Perceptron',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
              ],
              _id: '5e54bd3aeff6c34770c8c7f8',
              created_at: '2020-02-25T06:22:43.000Z',
              id: '1232189162364731400',
              id_str: '1232189162364731392',
              text:
                'cuomoprimetime the sixword argument for term limits mitch mcconnell lindsey graham ted cruz tom steyer argues that term limits…',
              source:
                '<a href="http://www.tweetcaster.com" rel="nofollow">TweetCaster for Android</a>',
              truncated: false,
              in_reply_to_status_id: null,
              in_reply_to_status_id_str: null,
              in_reply_to_user_id: null,
              in_reply_to_user_id_str: null,
              in_reply_to_screen_name: null,
              user: {
                id: 2382499392,
                id_str: '2382499392',
                name: 'Eric Edwards',
                screen_name: 'UCFONEBIGOHANA',
                location: null,
                url: null,
                description: null,
                translator_type: 'none',
                protected: false,
                verified: false,
                followers_count: 197,
                friends_count: 239,
                listed_count: 11,
                favourites_count: 2796,
                statuses_count: 36245,
                created_at: 'Mon Mar 10 18:16:46 +0000 2014',
                utc_offset: null,
                time_zone: null,
                geo_enabled: true,
                lang: null,
                contributors_enabled: false,
                is_translator: false,
                profile_background_color: 'C0DEED',
                profile_background_image_url:
                  'http://abs.twimg.com/images/themes/theme1/bg.png',
                profile_background_image_url_https:
                  'https://abs.twimg.com/images/themes/theme1/bg.png',
                profile_background_tile: false,
                profile_link_color: '1DA1F2',
                profile_sidebar_border_color: 'C0DEED',
                profile_sidebar_fill_color: 'DDEEF6',
                profile_text_color: '333333',
                profile_use_background_image: true,
                profile_image_url:
                  'http://pbs.twimg.com/profile_images/1158453145808318465/y7T4kW4l_normal.jpg',
                profile_image_url_https:
                  'https://pbs.twimg.com/profile_images/1158453145808318465/y7T4kW4l_normal.jpg',
                profile_banner_url:
                  'https://pbs.twimg.com/profile_banners/2382499392/1566417560',
                default_profile: true,
                default_profile_image: false,
                following: null,
                follow_request_sent: null,
                notifications: null,
              },
              geo: null,
              coordinates: null,
              place: null,
              contributors: null,
              retweeted_status: {
                created_at: 'Tue Feb 25 05:10:33 +0000 2020',
                id: 1232170997182337000,
                id_str: '1232170997182337024',
                text:
                  '"The six-word argument for term limits: Mitch McConnell, Lindsey Graham, Ted Cruz."\n\nTom Steyer argues that term li… https://t.co/psFSq0Ywl6',
                display_text_range: [0, 140],
                source:
                  '<a href="http://www.snapstream.com" rel="nofollow">SnapStream TV Search</a>',
                truncated: true,
                in_reply_to_status_id: null,
                in_reply_to_status_id_str: null,
                in_reply_to_user_id: null,
                in_reply_to_user_id_str: null,
                in_reply_to_screen_name: null,
                user: {
                  id: 902725445334044700,
                  id_str: '902725445334044677',
                  name: 'Cuomo Prime Time',
                  screen_name: 'CuomoPrimeTime',
                  location: null,
                  url: null,
                  description:
                    'When he faces power, no one gets a pass. #CuomoPrimeTime with @ChrisCuomo airs weeknights at 9 p.m. ET on CNN. #LetsGetAfterIt',
                  translator_type: 'none',
                  protected: false,
                  verified: true,
                  followers_count: 106097,
                  friends_count: 6889,
                  listed_count: 569,
                  favourites_count: 52,
                  statuses_count: 2234,
                  created_at: 'Wed Aug 30 02:51:32 +0000 2017',
                  utc_offset: null,
                  time_zone: null,
                  geo_enabled: false,
                  lang: null,
                  contributors_enabled: false,
                  is_translator: false,
                  profile_background_color: 'F5F8FA',
                  profile_background_image_url: '',
                  profile_background_image_url_https: '',
                  profile_background_tile: false,
                  profile_link_color: '1DA1F2',
                  profile_sidebar_border_color: 'C0DEED',
                  profile_sidebar_fill_color: 'DDEEF6',
                  profile_text_color: '333333',
                  profile_use_background_image: true,
                  profile_image_url:
                    'http://pbs.twimg.com/profile_images/1002645908666736640/m4fyFFaf_normal.jpg',
                  profile_image_url_https:
                    'https://pbs.twimg.com/profile_images/1002645908666736640/m4fyFFaf_normal.jpg',
                  profile_banner_url:
                    'https://pbs.twimg.com/profile_banners/902725445334044677/1527884605',
                  default_profile: true,
                  default_profile_image: false,
                  following: null,
                  follow_request_sent: null,
                  notifications: null,
                },
                geo: null,
                coordinates: null,
                place: null,
                contributors: null,
                is_quote_status: false,
                extended_tweet: {
                  full_text:
                    '"The six-word argument for term limits: Mitch McConnell, Lindsey Graham, Ted Cruz."\n\nTom Steyer argues that term limits for lawmakers will help get gun legislation passed. "If we want real change, we need new and different people in charge." #CNNTownHall https://t.co/HL1sFB4Fd8',
                  display_text_range: [0, 254],
                  entities: {
                    hashtags: [
                      {
                        text: 'CNNTownHall',
                        indices: [242, 254],
                      },
                    ],
                    urls: [],
                    user_mentions: [],
                    symbols: [],
                    media: [
                      {
                        id: 1232170923631005700,
                        id_str: '1232170923631005696',
                        indices: [255, 278],
                        additional_media_info: {
                          monetizable: false,
                        },
                        media_url:
                          'http://pbs.twimg.com/media/ERmM7IaXUAA1aNP.jpg',
                        media_url_https:
                          'https://pbs.twimg.com/media/ERmM7IaXUAA1aNP.jpg',
                        url: 'https://t.co/HL1sFB4Fd8',
                        display_url: 'pic.twitter.com/HL1sFB4Fd8',
                        expanded_url:
                          'https://twitter.com/CuomoPrimeTime/status/1232170997182337024/video/1',
                        type: 'video',
                        video_info: {
                          aspect_ratio: [16, 9],
                          duration_millis: 160394,
                          variants: [
                            {
                              bitrate: 2176000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/amplify_video/1232170923631005696/vid/960x540/4J5Eoc8njOOtnVYv.mp4?tag=13',
                            },
                            {
                              content_type: 'application/x-mpegURL',
                              url:
                                'https://video.twimg.com/amplify_video/1232170923631005696/pl/BB46P2lB-9yoNXbM.m3u8?tag=13',
                            },
                            {
                              bitrate: 288000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/amplify_video/1232170923631005696/vid/480x270/Fxx8pUUjNku0sfm4.mp4?tag=13',
                            },
                            {
                              bitrate: 832000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/amplify_video/1232170923631005696/vid/640x360/g4o9Xozms_GV0gT7.mp4?tag=13',
                            },
                          ],
                        },
                        sizes: {
                          small: {
                            w: 680,
                            h: 453,
                            resize: 'fit',
                          },
                          thumb: {
                            w: 150,
                            h: 150,
                            resize: 'crop',
                          },
                          large: {
                            w: 760,
                            h: 506,
                            resize: 'fit',
                          },
                          medium: {
                            w: 760,
                            h: 506,
                            resize: 'fit',
                          },
                        },
                      },
                    ],
                  },
                  extended_entities: {
                    media: [
                      {
                        id: 1232170923631005700,
                        id_str: '1232170923631005696',
                        indices: [255, 278],
                        additional_media_info: {
                          monetizable: false,
                        },
                        media_url:
                          'http://pbs.twimg.com/media/ERmM7IaXUAA1aNP.jpg',
                        media_url_https:
                          'https://pbs.twimg.com/media/ERmM7IaXUAA1aNP.jpg',
                        url: 'https://t.co/HL1sFB4Fd8',
                        display_url: 'pic.twitter.com/HL1sFB4Fd8',
                        expanded_url:
                          'https://twitter.com/CuomoPrimeTime/status/1232170997182337024/video/1',
                        type: 'video',
                        video_info: {
                          aspect_ratio: [16, 9],
                          duration_millis: 160394,
                          variants: [
                            {
                              bitrate: 2176000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/amplify_video/1232170923631005696/vid/960x540/4J5Eoc8njOOtnVYv.mp4?tag=13',
                            },
                            {
                              content_type: 'application/x-mpegURL',
                              url:
                                'https://video.twimg.com/amplify_video/1232170923631005696/pl/BB46P2lB-9yoNXbM.m3u8?tag=13',
                            },
                            {
                              bitrate: 288000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/amplify_video/1232170923631005696/vid/480x270/Fxx8pUUjNku0sfm4.mp4?tag=13',
                            },
                            {
                              bitrate: 832000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/amplify_video/1232170923631005696/vid/640x360/g4o9Xozms_GV0gT7.mp4?tag=13',
                            },
                          ],
                        },
                        sizes: {
                          small: {
                            w: 680,
                            h: 453,
                            resize: 'fit',
                          },
                          thumb: {
                            w: 150,
                            h: 150,
                            resize: 'crop',
                          },
                          large: {
                            w: 760,
                            h: 506,
                            resize: 'fit',
                          },
                          medium: {
                            w: 760,
                            h: 506,
                            resize: 'fit',
                          },
                        },
                      },
                    ],
                  },
                },
                quote_count: 0,
                reply_count: 6,
                retweet_count: 23,
                favorite_count: 101,
                entities: {
                  hashtags: [],
                  urls: [
                    {
                      url: 'https://t.co/psFSq0Ywl6',
                      expanded_url:
                        'https://twitter.com/i/web/status/1232170997182337024',
                      display_url: 'twitter.com/i/web/status/1…',
                      indices: [117, 140],
                    },
                  ],
                  user_mentions: [],
                  symbols: [],
                },
                favorited: false,
                retweeted: false,
                possibly_sensitive: false,
                filter_level: 'low',
                lang: 'en',
              },
              is_quote_status: false,
              retweet_count: 0,
              favorite_count: 0,
              entities: {
                hashtags: [],
                urls: [],
                user_mentions: [
                  {
                    screen_name: 'CuomoPrimeTime',
                    name: 'Cuomo Prime Time',
                    id: 902725445334044700,
                    id_str: '902725445334044677',
                    indices: [3, 18],
                  },
                ],
                symbols: [],
              },
              favorited: false,
              retweeted: false,
              topics: {
                democratic: ['tom steyer'],
              },
              original_text:
                'RT @CuomoPrimeTime: "The six-word argument for term limits: Mitch McConnell, Lindsey Graham, Ted Cruz."\n\nTom Steyer argues that term limits…',
              arrived_at: '1582611770663',
              updated_at: '2020-02-25T06:22:43.000Z',
            },
          ],
        },
        {
          id: 192797312,
          w2v: 5.2,
          id_str: '192797312',
          name: 'Osman Naqs',
          screen_name: 'jinkinggon',
          location: null,
          url: null,
          description: null,
          translator_type: 'none',
          protected: false,
          verified: false,
          followers_count: 34,
          friends_count: 434,
          listed_count: 2,
          favourites_count: 315,
          statuses_count: 1698,
          created_at: 'Mon Sep 20 05:02:34 +0000 2010',
          utc_offset: null,
          time_zone: null,
          geo_enabled: true,
          lang: null,
          contributors_enabled: false,
          is_translator: false,
          profile_background_color: 'C0DEED',
          profile_background_image_url:
            'http://abs.twimg.com/images/themes/theme1/bg.png',
          profile_background_image_url_https:
            'https://abs.twimg.com/images/themes/theme1/bg.png',
          profile_background_tile: false,
          profile_link_color: '1DA1F2',
          profile_sidebar_border_color: 'C0DEED',
          profile_sidebar_fill_color: 'DDEEF6',
          profile_text_color: '333333',
          profile_use_background_image: true,
          profile_image_url:
            'http://pbs.twimg.com/profile_images/1023446977042898944/bqF4Hbqw_normal.jpg',
          profile_image_url_https:
            'https://pbs.twimg.com/profile_images/1023446977042898944/bqF4Hbqw_normal.jpg',
          profile_banner_url:
            'https://pbs.twimg.com/profile_banners/192797312/1354536972',
          default_profile: true,
          default_profile_image: false,
          following: null,
          follow_request_sent: null,
          notifications: null,
          tweets: [
            {
              keywords: ['bernie sanders'],
              analysis: [
                {
                  id: 'ibm',
                  title: 'IBM Natural Language Understanding API',
                  result: 0,
                  meta: {
                    usage: {
                      text_units: 1,
                      text_characters: 135,
                      features: 5,
                    },
                    sentiment: {
                      document: {
                        score: 0,
                        label: 'neutral',
                      },
                    },
                    semantic_roles: [
                      {
                        subject: {
                          text: 'ndrew_lawrence chris matthews',
                          keywords: [
                            {
                              text: 'ndrew_lawrence chris matthews',
                            },
                          ],
                          entities: [
                            {
                              type: 'Person',
                              text: 'chris matthews',
                            },
                          ],
                        },
                        sentence:
                          'ndrew_lawrence chris matthews apologizes to bernie sanders and his supporters for comparing bernies nv win to nazis taking france in w…',
                        object: {
                          text: 'sanders and his supporters',
                          keywords: [
                            {
                              text: 'sanders',
                            },
                            {
                              text: 'supporters',
                            },
                          ],
                        },
                        action: {
                          verb: {
                            text: 'bernie',
                            tense: 'future',
                          },
                          text: 'to bernie',
                          normalized: 'to bernie',
                        },
                      },
                      {
                        subject: {
                          text: 'bernies nv win',
                          keywords: [
                            {
                              text: 'bernies',
                            },
                            {
                              text: 'win',
                            },
                          ],
                          entities: [
                            {
                              type: 'Location',
                              text: 'bernies nv',
                              disambiguation: {
                                subtype: ['City'],
                              },
                            },
                          ],
                        },
                        sentence:
                          'ndrew_lawrence chris matthews apologizes to bernie sanders and his supporters for comparing bernies nv win to nazis taking france in w…',
                        object: {
                          text: 'to nazis taking france in w…',
                          keywords: [
                            {
                              text: 'nazis',
                            },
                            {
                              text: 'france',
                            },
                            {
                              text: 'w…',
                            },
                          ],
                          entities: [
                            {
                              type: 'Location',
                              text: 'france',
                              disambiguation: {
                                subtype: ['Country'],
                                name: 'Vichy France',
                                dbpedia_resource:
                                  'http://dbpedia.org/resource/Vichy_France',
                              },
                            },
                            {
                              type: 'Location',
                              text: 'w…',
                              disambiguation: {
                                subtype: ['City'],
                              },
                            },
                          ],
                        },
                        action: {
                          verb: {
                            text: 'compare',
                            tense: 'present',
                          },
                          text: 'comparing',
                          normalized: 'compare',
                        },
                      },
                      {
                        subject: {
                          text: 'france',
                          keywords: [
                            {
                              text: 'france',
                            },
                          ],
                          entities: [
                            {
                              type: 'Location',
                              text: 'france',
                              disambiguation: {
                                subtype: ['Country'],
                                name: 'Vichy France',
                                dbpedia_resource:
                                  'http://dbpedia.org/resource/Vichy_France',
                              },
                            },
                          ],
                        },
                        sentence:
                          'ndrew_lawrence chris matthews apologizes to bernie sanders and his supporters for comparing bernies nv win to nazis taking france in w…',
                        object: {
                          text: 'in w…',
                          keywords: [
                            {
                              text: 'w…',
                            },
                          ],
                          entities: [
                            {
                              type: 'Location',
                              text: 'w…',
                              disambiguation: {
                                subtype: ['City'],
                              },
                            },
                          ],
                        },
                        action: {
                          verb: {
                            text: 'take',
                            tense: 'present',
                          },
                          text: 'taking',
                          normalized: 'take',
                        },
                      },
                    ],
                    language: 'en',
                    keywords: [
                      {
                        text: 'lawrence chris matthews',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.982302,
                        emotion: {
                          sadness: 0.169966,
                          joy: 0.044981,
                          fear: 0.021379,
                          disgust: 0.711278,
                          anger: 0.070561,
                        },
                        count: 1,
                      },
                      {
                        text: 'sanders',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.598966,
                        emotion: {
                          sadness: 0.169966,
                          joy: 0.044981,
                          fear: 0.021379,
                          disgust: 0.711278,
                          anger: 0.070561,
                        },
                        count: 1,
                      },
                      {
                        text: 'supporters',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.590566,
                        emotion: {
                          sadness: 0.169966,
                          joy: 0.044981,
                          fear: 0.021379,
                          disgust: 0.711278,
                          anger: 0.070561,
                        },
                        count: 1,
                      },
                    ],
                    entities: [
                      {
                        type: 'Location',
                        text: 'france',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.33,
                        emotion: {
                          sadness: 0.169966,
                          joy: 0.044981,
                          fear: 0.021379,
                          disgust: 0.711278,
                          anger: 0.070561,
                        },
                        disambiguation: {
                          subtype: ['Country'],
                          name: 'Vichy France',
                          dbpedia_resource:
                            'http://dbpedia.org/resource/Vichy_France',
                        },
                        count: 1,
                      },
                      {
                        type: 'Location',
                        text: 'w…',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.33,
                        emotion: {
                          sadness: 0.169966,
                          joy: 0.044981,
                          fear: 0.021379,
                          disgust: 0.711278,
                          anger: 0.070561,
                        },
                        disambiguation: {
                          subtype: ['City'],
                        },
                        count: 1,
                      },
                    ],
                    concepts: [
                      {
                        text: 'Chris Matthews',
                        relevance: 0.886784,
                        dbpedia_resource:
                          'http://dbpedia.org/resource/Chris_Matthews',
                      },
                    ],
                    warnings: ['emotion: cannot locate keyphrase'],
                  },
                },
                {
                  id: 'naturaljs-afinn165',
                  title: 'Natural JS Library - AFINN-165 Vocab.',
                  result: 0.047619047619047616,
                },
                {
                  id: 'naturaljs-senticon',
                  title: 'Natural JS Library - SENTICON Vocab.',
                  result: 0.016666666666666666,
                },
                {
                  id: 'naturaljs-pattern',
                  title: 'Natural JS Library - PATTERN Vocab.',
                  result: 0.00761904761904762,
                },
                {
                  id: 'sentimentjs',
                  title: 'Sentiment JS Library',
                  result: 0.03809523809523809,
                  meta: {
                    score: 4,
                    comparative: 0.19047619047619047,
                    tokens: [
                      'ndrewlawrence',
                      'chris',
                      'matthews',
                      'apologizes',
                      'to',
                      'bernie',
                      'sanders',
                      'and',
                      'his',
                      'supporters',
                      'for',
                      'comparing',
                      'bernies',
                      'nv',
                      'win',
                      'to',
                      'nazis',
                      'taking',
                      'france',
                      'in',
                      'w…',
                    ],
                    words: ['win', 'supporters', 'apologizes'],
                    positive: ['win', 'supporters'],
                    negative: ['apologizes'],
                  },
                },
              ],
              labels: [
                {
                  id: 'LSTM',
                  title: 'Long Short-Term Memory Model',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'CNN',
                  title: 'Convolutional Neural Network Model',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'SVM',
                  title: 'Support Vector Machine',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'KNN',
                  title: 'K-nearest Neighbors',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'RF',
                  title: 'Random Forests',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'MLP',
                  title: 'Multilayer Perceptron',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
              ],
              _id: '5e54bd3beff6c34770c8c7f9',
              created_at: '2020-02-25T06:22:43.000Z',
              id: '1232189162624880600',
              id_str: '1232189162624880642',
              text:
                'ndrew_lawrence chris matthews apologizes to bernie sanders and his supporters for comparing bernies nv win to nazis taking france in w…',
              source:
                '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
              truncated: false,
              in_reply_to_status_id: null,
              in_reply_to_status_id_str: null,
              in_reply_to_user_id: null,
              in_reply_to_user_id_str: null,
              in_reply_to_screen_name: null,
              user: {
                id: 192797312,
                id_str: '192797312',
                name: 'Osman Naqs',
                screen_name: 'jinkinggon',
                location: null,
                url: null,
                description: null,
                translator_type: 'none',
                protected: false,
                verified: false,
                followers_count: 34,
                friends_count: 434,
                listed_count: 2,
                favourites_count: 315,
                statuses_count: 1698,
                created_at: 'Mon Sep 20 05:02:34 +0000 2010',
                utc_offset: null,
                time_zone: null,
                geo_enabled: true,
                lang: null,
                contributors_enabled: false,
                is_translator: false,
                profile_background_color: 'C0DEED',
                profile_background_image_url:
                  'http://abs.twimg.com/images/themes/theme1/bg.png',
                profile_background_image_url_https:
                  'https://abs.twimg.com/images/themes/theme1/bg.png',
                profile_background_tile: false,
                profile_link_color: '1DA1F2',
                profile_sidebar_border_color: 'C0DEED',
                profile_sidebar_fill_color: 'DDEEF6',
                profile_text_color: '333333',
                profile_use_background_image: true,
                profile_image_url:
                  'http://pbs.twimg.com/profile_images/1023446977042898944/bqF4Hbqw_normal.jpg',
                profile_image_url_https:
                  'https://pbs.twimg.com/profile_images/1023446977042898944/bqF4Hbqw_normal.jpg',
                profile_banner_url:
                  'https://pbs.twimg.com/profile_banners/192797312/1354536972',
                default_profile: true,
                default_profile_image: false,
                following: null,
                follow_request_sent: null,
                notifications: null,
              },
              geo: null,
              coordinates: null,
              place: null,
              contributors: null,
              retweeted_status: {
                created_at: 'Tue Feb 25 00:07:47 +0000 2020',
                id: 1232094806773584000,
                id_str: '1232094806773583874',
                text:
                  'Chris Matthews apologizes to Bernie Sanders and his supporters for comparing Bernies NV win to Nazis taking France… https://t.co/uSW2EnwSfR',
                display_text_range: [0, 140],
                source:
                  '<a href="http://www.snapstream.com" rel="nofollow">SnapStream TV Search</a>',
                truncated: true,
                in_reply_to_status_id: null,
                in_reply_to_status_id_str: null,
                in_reply_to_user_id: null,
                in_reply_to_user_id_str: null,
                in_reply_to_screen_name: null,
                user: {
                  id: 1228462620,
                  id_str: '1228462620',
                  name: 'Andrew Lawrence',
                  screen_name: 'ndrew_lawrence',
                  location: null,
                  url: null,
                  description:
                    'Deputy Director of Rapid Response @mmfa but views here are my own - 99% of RTs are endorsements',
                  translator_type: 'none',
                  protected: false,
                  verified: false,
                  followers_count: 36782,
                  friends_count: 3606,
                  listed_count: 627,
                  favourites_count: 96020,
                  statuses_count: 46656,
                  created_at: 'Thu Feb 28 22:06:12 +0000 2013',
                  utc_offset: null,
                  time_zone: null,
                  geo_enabled: true,
                  lang: null,
                  contributors_enabled: false,
                  is_translator: false,
                  profile_background_color: '131516',
                  profile_background_image_url:
                    'http://abs.twimg.com/images/themes/theme14/bg.gif',
                  profile_background_image_url_https:
                    'https://abs.twimg.com/images/themes/theme14/bg.gif',
                  profile_background_tile: true,
                  profile_link_color: '009999',
                  profile_sidebar_border_color: 'EEEEEE',
                  profile_sidebar_fill_color: 'EFEFEF',
                  profile_text_color: '333333',
                  profile_use_background_image: true,
                  profile_image_url:
                    'http://pbs.twimg.com/profile_images/1212827185616183298/rEXWFQlW_normal.jpg',
                  profile_image_url_https:
                    'https://pbs.twimg.com/profile_images/1212827185616183298/rEXWFQlW_normal.jpg',
                  profile_banner_url:
                    'https://pbs.twimg.com/profile_banners/1228462620/1493957830',
                  default_profile: false,
                  default_profile_image: false,
                  following: null,
                  follow_request_sent: null,
                  notifications: null,
                },
                geo: null,
                coordinates: null,
                place: null,
                contributors: null,
                is_quote_status: false,
                extended_tweet: {
                  full_text:
                    'Chris Matthews apologizes to Bernie Sanders and his supporters for comparing Bernies NV win to Nazis taking France in WWII https://t.co/gMq9mnq30i',
                  display_text_range: [0, 122],
                  entities: {
                    hashtags: [],
                    urls: [],
                    user_mentions: [],
                    symbols: [],
                    media: [
                      {
                        id: 1232094756190158800,
                        id_str: '1232094756190158849',
                        indices: [123, 146],
                        additional_media_info: {
                          monetizable: false,
                        },
                        media_url:
                          'http://pbs.twimg.com/ext_tw_video_thumb/1232094756190158849/pu/img/MwnIrzM1UqtBvusQ.jpg',
                        media_url_https:
                          'https://pbs.twimg.com/ext_tw_video_thumb/1232094756190158849/pu/img/MwnIrzM1UqtBvusQ.jpg',
                        url: 'https://t.co/gMq9mnq30i',
                        display_url: 'pic.twitter.com/gMq9mnq30i',
                        expanded_url:
                          'https://twitter.com/ndrew_lawrence/status/1232094806773583874/video/1',
                        type: 'video',
                        video_info: {
                          aspect_ratio: [16, 9],
                          duration_millis: 46980,
                          variants: [
                            {
                              bitrate: 2176000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232094756190158849/pu/vid/960x540/kGahyiepyD3GFXuP.mp4?tag=10',
                            },
                            {
                              content_type: 'application/x-mpegURL',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232094756190158849/pu/pl/XUf59578PCixhA7f.m3u8?tag=10',
                            },
                            {
                              bitrate: 832000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232094756190158849/pu/vid/640x360/uAQ7llxAjEr2BR1H.mp4?tag=10',
                            },
                            {
                              bitrate: 256000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232094756190158849/pu/vid/480x270/EqinTj9HTARUGRG-.mp4?tag=10',
                            },
                          ],
                        },
                        sizes: {
                          thumb: {
                            w: 150,
                            h: 150,
                            resize: 'crop',
                          },
                          medium: {
                            w: 960,
                            h: 540,
                            resize: 'fit',
                          },
                          small: {
                            w: 680,
                            h: 383,
                            resize: 'fit',
                          },
                          large: {
                            w: 960,
                            h: 540,
                            resize: 'fit',
                          },
                        },
                      },
                    ],
                  },
                  extended_entities: {
                    media: [
                      {
                        id: 1232094756190158800,
                        id_str: '1232094756190158849',
                        indices: [123, 146],
                        additional_media_info: {
                          monetizable: false,
                        },
                        media_url:
                          'http://pbs.twimg.com/ext_tw_video_thumb/1232094756190158849/pu/img/MwnIrzM1UqtBvusQ.jpg',
                        media_url_https:
                          'https://pbs.twimg.com/ext_tw_video_thumb/1232094756190158849/pu/img/MwnIrzM1UqtBvusQ.jpg',
                        url: 'https://t.co/gMq9mnq30i',
                        display_url: 'pic.twitter.com/gMq9mnq30i',
                        expanded_url:
                          'https://twitter.com/ndrew_lawrence/status/1232094806773583874/video/1',
                        type: 'video',
                        video_info: {
                          aspect_ratio: [16, 9],
                          duration_millis: 46980,
                          variants: [
                            {
                              bitrate: 2176000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232094756190158849/pu/vid/960x540/kGahyiepyD3GFXuP.mp4?tag=10',
                            },
                            {
                              content_type: 'application/x-mpegURL',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232094756190158849/pu/pl/XUf59578PCixhA7f.m3u8?tag=10',
                            },
                            {
                              bitrate: 832000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232094756190158849/pu/vid/640x360/uAQ7llxAjEr2BR1H.mp4?tag=10',
                            },
                            {
                              bitrate: 256000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232094756190158849/pu/vid/480x270/EqinTj9HTARUGRG-.mp4?tag=10',
                            },
                          ],
                        },
                        sizes: {
                          thumb: {
                            w: 150,
                            h: 150,
                            resize: 'crop',
                          },
                          medium: {
                            w: 960,
                            h: 540,
                            resize: 'fit',
                          },
                          small: {
                            w: 680,
                            h: 383,
                            resize: 'fit',
                          },
                          large: {
                            w: 960,
                            h: 540,
                            resize: 'fit',
                          },
                        },
                      },
                    ],
                  },
                },
                quote_count: 796,
                reply_count: 938,
                retweet_count: 1317,
                favorite_count: 8684,
                entities: {
                  hashtags: [],
                  urls: [
                    {
                      url: 'https://t.co/uSW2EnwSfR',
                      expanded_url:
                        'https://twitter.com/i/web/status/1232094806773583874',
                      display_url: 'twitter.com/i/web/status/1…',
                      indices: [116, 139],
                    },
                  ],
                  user_mentions: [],
                  symbols: [],
                },
                favorited: false,
                retweeted: false,
                possibly_sensitive: false,
                filter_level: 'low',
                lang: 'en',
              },
              is_quote_status: false,
              retweet_count: 0,
              favorite_count: 0,
              entities: {
                hashtags: [],
                urls: [],
                user_mentions: [
                  {
                    screen_name: 'ndrew_lawrence',
                    name: 'Andrew Lawrence',
                    id: 1228462620,
                    id_str: '1228462620',
                    indices: [3, 18],
                  },
                ],
                symbols: [],
              },
              favorited: false,
              retweeted: false,
              topics: {
                democratic: ['bernie sanders'],
              },
              original_text:
                'RT @ndrew_lawrence: Chris Matthews apologizes to Bernie Sanders and his supporters for comparing Bernies NV win to Nazis taking France in W…',
              arrived_at: '1582611771881',
              updated_at: '2020-02-25T06:22:43.000Z',
            },
          ],
        },
        {
          id: 1134775576714260500,
          w2v: 2.9,
          id_str: '1134775576714260480',
          name: 'ron',
          screen_name: 'ron84750909',
          location: null,
          url: null,
          description: '##',
          translator_type: 'none',
          protected: false,
          verified: false,
          followers_count: 191,
          friends_count: 1077,
          listed_count: 0,
          favourites_count: 16252,
          statuses_count: 16748,
          created_at: 'Sat Jun 01 10:55:55 +0000 2019',
          utc_offset: null,
          time_zone: null,
          geo_enabled: false,
          lang: null,
          contributors_enabled: false,
          is_translator: false,
          profile_background_color: 'F5F8FA',
          profile_background_image_url: '',
          profile_background_image_url_https: '',
          profile_background_tile: false,
          profile_link_color: '1DA1F2',
          profile_sidebar_border_color: 'C0DEED',
          profile_sidebar_fill_color: 'DDEEF6',
          profile_text_color: '333333',
          profile_use_background_image: true,
          profile_image_url:
            'http://pbs.twimg.com/profile_images/1134776538652692481/DgjEfqvD_normal.jpg',
          profile_image_url_https:
            'https://pbs.twimg.com/profile_images/1134776538652692481/DgjEfqvD_normal.jpg',
          default_profile: true,
          default_profile_image: false,
          following: null,
          follow_request_sent: null,
          notifications: null,
          tweets: [
            {
              keywords: ['trump'],
              analysis: [
                {
                  id: 'ibm',
                  title: 'IBM Natural Language Understanding API',
                  result: -0.502636,
                  meta: {
                    usage: {
                      text_units: 1,
                      text_characters: 125,
                      features: 5,
                    },
                    sentiment: {
                      document: {
                        score: -0.502636,
                        label: 'negative',
                      },
                    },
                    semantic_roles: [
                      {
                        subject: {
                          text: 'realdonaldtrump',
                          keywords: [
                            {
                              text: 'realdonaldtrump',
                            },
                          ],
                        },
                        sentence:
                          'realdonaldtrump on all trump or trump related matters while “elections have consequences” i only ask for fairness especially…',
                        object: {
                          text: 'related matters',
                          keywords: [
                            {
                              text: 'matters',
                            },
                          ],
                        },
                        action: {
                          verb: {
                            text: 'trump',
                            tense: 'present',
                          },
                          text: 'trump',
                          normalized: 'trump',
                        },
                      },
                      {
                        subject: {
                          text: 'elections',
                          keywords: [
                            {
                              text: 'elections',
                            },
                          ],
                        },
                        sentence:
                          'realdonaldtrump on all trump or trump related matters while “elections have consequences” i only ask for fairness especially…',
                        object: {
                          text:
                            'consequences” i only ask for fairness especially…',
                          keywords: [
                            {
                              text: 'fairness especially…',
                            },
                            {
                              text: 'consequences',
                            },
                          ],
                        },
                        action: {
                          verb: {
                            text: 'have',
                            tense: 'present',
                          },
                          text: 'have',
                          normalized: 'have',
                        },
                      },
                    ],
                    language: 'en',
                    keywords: [
                      {
                        text: 'related matters',
                        sentiment: {
                          score: -0.502636,
                          label: 'negative',
                        },
                        relevance: 0.985513,
                        emotion: {
                          sadness: 0.450132,
                          joy: 0.075811,
                          fear: 0.193404,
                          disgust: 0.119732,
                          anger: 0.247106,
                        },
                        count: 1,
                      },
                      {
                        text: 'trump',
                        sentiment: {
                          score: -0.502636,
                          label: 'negative',
                        },
                        relevance: 0.829817,
                        emotion: {
                          sadness: 0.450132,
                          joy: 0.075811,
                          fear: 0.193404,
                          disgust: 0.119732,
                          anger: 0.247106,
                        },
                        count: 2,
                      },
                      {
                        text: 'elections',
                        sentiment: {
                          score: -0.502636,
                          label: 'negative',
                        },
                        relevance: 0.624372,
                        emotion: {
                          sadness: 0.450132,
                          joy: 0.075811,
                          fear: 0.193404,
                          disgust: 0.119732,
                          anger: 0.247106,
                        },
                        count: 1,
                      },
                    ],
                    entities: [],
                    concepts: [
                      {
                        text: 'Don Cherry',
                        relevance: 0.837761,
                        dbpedia_resource:
                          'http://dbpedia.org/resource/Don_Cherry_(jazz)',
                      },
                    ],
                    warnings: ['emotion: cannot locate keyphrase'],
                  },
                },
                {
                  id: 'naturaljs-afinn165',
                  title: 'Natural JS Library - AFINN-165 Vocab.',
                  result: 0.03333333333333333,
                },
                {
                  id: 'naturaljs-senticon',
                  title: 'Natural JS Library - SENTICON Vocab.',
                  result: 0.024655555555555552,
                },
                {
                  id: 'naturaljs-pattern',
                  title: 'Natural JS Library - PATTERN Vocab.',
                  result: 0.016666666666666666,
                },
                {
                  id: 'sentimentjs',
                  title: 'Sentiment JS Library',
                  result: 0.03333333333333333,
                  meta: {
                    score: 3,
                    comparative: 0.16666666666666666,
                    tokens: [
                      'realdonaldtrump',
                      'on',
                      'all',
                      'trump',
                      'or',
                      'trump',
                      'related',
                      'matters',
                      'while',
                      '“elections',
                      'have',
                      'consequences”',
                      'i',
                      'only',
                      'ask',
                      'for',
                      'fairness',
                      'especially…',
                    ],
                    words: ['fairness', 'matters'],
                    positive: ['fairness', 'matters'],
                    negative: [],
                  },
                },
              ],
              labels: [
                {
                  id: 'LSTM',
                  title: 'Long Short-Term Memory Model',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'CNN',
                  title: 'Convolutional Neural Network Model',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'SVM',
                  title: 'Support Vector Machine',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'KNN',
                  title: 'K-nearest Neighbors',
                  result: {
                    theme: 'personal',
                    group: 'public',
                  },
                },
                {
                  id: 'RF',
                  title: 'Random Forests',
                  result: {
                    theme: 'personal',
                    group: 'public',
                  },
                },
                {
                  id: 'MLP',
                  title: 'Multilayer Perceptron',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
              ],
              _id: '5e54bd3beff6c34770c8c7fa',
              created_at: '2020-02-25T06:22:43.000Z',
              id: '1232189160204710000',
              id_str: '1232189160204709888',
              text:
                'realdonaldtrump on all trump or trump related matters while “elections have consequences” i only ask for fairness especially…',
              source:
                '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
              truncated: false,
              in_reply_to_status_id: null,
              in_reply_to_status_id_str: null,
              in_reply_to_user_id: null,
              in_reply_to_user_id_str: null,
              in_reply_to_screen_name: null,
              user: {
                id: 1134775576714260500,
                id_str: '1134775576714260480',
                name: 'ron',
                screen_name: 'ron84750909',
                location: null,
                url: null,
                description: '##',
                translator_type: 'none',
                protected: false,
                verified: false,
                followers_count: 191,
                friends_count: 1077,
                listed_count: 0,
                favourites_count: 16252,
                statuses_count: 16748,
                created_at: 'Sat Jun 01 10:55:55 +0000 2019',
                utc_offset: null,
                time_zone: null,
                geo_enabled: false,
                lang: null,
                contributors_enabled: false,
                is_translator: false,
                profile_background_color: 'F5F8FA',
                profile_background_image_url: '',
                profile_background_image_url_https: '',
                profile_background_tile: false,
                profile_link_color: '1DA1F2',
                profile_sidebar_border_color: 'C0DEED',
                profile_sidebar_fill_color: 'DDEEF6',
                profile_text_color: '333333',
                profile_use_background_image: true,
                profile_image_url:
                  'http://pbs.twimg.com/profile_images/1134776538652692481/DgjEfqvD_normal.jpg',
                profile_image_url_https:
                  'https://pbs.twimg.com/profile_images/1134776538652692481/DgjEfqvD_normal.jpg',
                default_profile: true,
                default_profile_image: false,
                following: null,
                follow_request_sent: null,
                notifications: null,
              },
              geo: null,
              coordinates: null,
              place: null,
              contributors: null,
              retweeted_status: {
                created_at: 'Tue Feb 25 04:09:20 +0000 2020',
                id: 1232155595438018600,
                id_str: '1232155595438018567',
                text:
                  '....on all Trump, or Trump related, matters! While “elections have consequences”, I only ask for fairness, especial… https://t.co/XrgUWEAHlS',
                source:
                  '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
                truncated: true,
                in_reply_to_status_id: 1232155591537254400,
                in_reply_to_status_id_str: '1232155591537254400',
                in_reply_to_user_id: 25073877,
                in_reply_to_user_id_str: '25073877',
                in_reply_to_screen_name: 'realDonaldTrump',
                user: {
                  id: 25073877,
                  id_str: '25073877',
                  name: 'Donald J. Trump',
                  screen_name: 'realDonaldTrump',
                  location: 'Washington, DC',
                  url: 'http://www.Instagram.com/realDonaldTrump',
                  description:
                    '45th President of the United States of America🇺🇸',
                  translator_type: 'regular',
                  protected: false,
                  verified: true,
                  followers_count: 72985185,
                  friends_count: 47,
                  listed_count: 115097,
                  favourites_count: 7,
                  statuses_count: 49283,
                  created_at: 'Wed Mar 18 13:46:38 +0000 2009',
                  utc_offset: null,
                  time_zone: null,
                  geo_enabled: true,
                  lang: null,
                  contributors_enabled: false,
                  is_translator: false,
                  profile_background_color: '6D5C18',
                  profile_background_image_url:
                    'http://abs.twimg.com/images/themes/theme1/bg.png',
                  profile_background_image_url_https:
                    'https://abs.twimg.com/images/themes/theme1/bg.png',
                  profile_background_tile: true,
                  profile_link_color: '1B95E0',
                  profile_sidebar_border_color: 'BDDCAD',
                  profile_sidebar_fill_color: 'C5CEC0',
                  profile_text_color: '333333',
                  profile_use_background_image: true,
                  profile_image_url:
                    'http://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_normal.jpg',
                  profile_image_url_https:
                    'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_normal.jpg',
                  profile_banner_url:
                    'https://pbs.twimg.com/profile_banners/25073877/1580873630',
                  default_profile: false,
                  default_profile_image: false,
                  following: null,
                  follow_request_sent: null,
                  notifications: null,
                },
                geo: null,
                coordinates: null,
                place: null,
                contributors: null,
                is_quote_status: false,
                extended_tweet: {
                  full_text:
                    '....on all Trump, or Trump related, matters! While “elections have consequences”, I only ask for fairness, especially when it comes to decisions made by the United States Supreme Court!',
                  display_text_range: [0, 185],
                  entities: {
                    hashtags: [],
                    urls: [],
                    user_mentions: [],
                    symbols: [],
                  },
                },
                quote_count: 185,
                reply_count: 1957,
                retweet_count: 4525,
                favorite_count: 18002,
                entities: {
                  hashtags: [],
                  urls: [
                    {
                      url: 'https://t.co/XrgUWEAHlS',
                      expanded_url:
                        'https://twitter.com/i/web/status/1232155595438018567',
                      display_url: 'twitter.com/i/web/status/1…',
                      indices: [117, 140],
                    },
                  ],
                  user_mentions: [],
                  symbols: [],
                },
                favorited: false,
                retweeted: false,
                filter_level: 'low',
                lang: 'en',
              },
              is_quote_status: false,
              retweet_count: 0,
              favorite_count: 0,
              entities: {
                hashtags: [],
                urls: [],
                user_mentions: [
                  {
                    screen_name: 'realDonaldTrump',
                    name: 'Donald J. Trump',
                    id: 25073877,
                    id_str: '25073877',
                    indices: [3, 19],
                  },
                ],
                symbols: [],
              },
              favorited: false,
              retweeted: false,
              topics: {
                republican: ['trump'],
              },
              original_text:
                'RT @realDonaldTrump: ....on all Trump, or Trump related, matters! While “elections have consequences”, I only ask for fairness, especially…',
              arrived_at: '1582611771892',
              updated_at: '2020-02-25T06:22:43.000Z',
            },
          ],
        },
        {
          id: 3104950051,
          w2v: 4,
          id_str: '3104950051',
          name: 'Tommy',
          screen_name: 'birdman8272',
          location: 'United States',
          url: null,
          description:
            'Christian:God Bless President Trump! \nUS Army Signal Corps.Honor to be  followed by @GenFlynn  @AlvedaCKing\n#AmericaFirst\n#KAG',
          translator_type: 'none',
          protected: false,
          verified: false,
          followers_count: 30596,
          friends_count: 19832,
          listed_count: 105,
          favourites_count: 204938,
          statuses_count: 260366,
          created_at: 'Mon Mar 23 14:20:59 +0000 2015',
          utc_offset: null,
          time_zone: null,
          geo_enabled: true,
          lang: null,
          contributors_enabled: false,
          is_translator: false,
          profile_background_color: 'C0DEED',
          profile_background_image_url:
            'http://abs.twimg.com/images/themes/theme1/bg.png',
          profile_background_image_url_https:
            'https://abs.twimg.com/images/themes/theme1/bg.png',
          profile_background_tile: false,
          profile_link_color: '1DA1F2',
          profile_sidebar_border_color: 'C0DEED',
          profile_sidebar_fill_color: 'DDEEF6',
          profile_text_color: '333333',
          profile_use_background_image: true,
          profile_image_url:
            'http://pbs.twimg.com/profile_images/1224194711637909504/qr-sdQzQ_normal.jpg',
          profile_image_url_https:
            'https://pbs.twimg.com/profile_images/1224194711637909504/qr-sdQzQ_normal.jpg',
          profile_banner_url:
            'https://pbs.twimg.com/profile_banners/3104950051/1526753847',
          default_profile: true,
          default_profile_image: false,
          following: null,
          follow_request_sent: null,
          notifications: null,
          tweets: [
            {
              keywords: ['joe biden'],
              analysis: [
                {
                  id: 'ibm',
                  title: 'IBM Natural Language Understanding API',
                  result: 0.55589,
                  meta: {
                    usage: {
                      text_units: 1,
                      text_characters: 129,
                      features: 5,
                    },
                    sentiment: {
                      document: {
                        score: 0.55589,
                        label: 'positive',
                      },
                    },
                    semantic_roles: [
                      {
                        subject: {
                          text: 'we',
                        },
                        sentence:
                          'shawng927 so in this brief speech we learned 1 joe biden is a candidate for the us senate 2 if you don’t like him vote for the o…',
                        action: {
                          verb: {
                            text: 'learn',
                            tense: 'past',
                          },
                          text: 'learned',
                          normalized: 'learn',
                        },
                      },
                      {
                        subject: {
                          text: 'the us',
                          entities: [
                            {
                              type: 'Location',
                              text: 'us',
                              disambiguation: {
                                subtype: [
                                  'Region',
                                  'AdministrativeDivision',
                                  'Country',
                                  'GovernmentalJurisdiction',
                                  'FilmEditor',
                                  'Country',
                                ],
                                name: 'United States',
                                dbpedia_resource:
                                  'http://dbpedia.org/resource/United_States',
                              },
                            },
                          ],
                        },
                        sentence:
                          'shawng927 so in this brief speech we learned 1 joe biden is a candidate for the us senate 2 if you don’t like him vote for the o…',
                        object: {
                          text: '2',
                        },
                        action: {
                          verb: {
                            text: 'senate',
                            tense: 'present',
                          },
                          text: 'senate',
                          normalized: 'senate',
                        },
                      },
                      {
                        subject: {
                          text: 'you',
                        },
                        sentence:
                          'shawng927 so in this brief speech we learned 1 joe biden is a candidate for the us senate 2 if you don’t like him vote for the o…',
                        object: {
                          text: 'n’t',
                          keywords: [
                            {
                              text: 'n’t',
                            },
                          ],
                        },
                        action: {
                          verb: {
                            text: 'do',
                            tense: 'present',
                          },
                          text: 'do',
                          normalized: 'do',
                        },
                      },
                    ],
                    language: 'en',
                    keywords: [
                      {
                        text: 'joe biden',
                        sentiment: {
                          score: 0.55589,
                          label: 'positive',
                        },
                        relevance: 0.967447,
                        emotion: {
                          sadness: 0.218587,
                          joy: 0.327037,
                          fear: 0.057367,
                          disgust: 0.378184,
                          anger: 0.105524,
                        },
                        count: 1,
                      },
                      {
                        text: 'brief speech',
                        sentiment: {
                          score: 0.55589,
                          label: 'positive',
                        },
                        relevance: 0.901143,
                        emotion: {
                          sadness: 0.218587,
                          joy: 0.327037,
                          fear: 0.057367,
                          disgust: 0.378184,
                          anger: 0.105524,
                        },
                        count: 1,
                      },
                      {
                        text: 'candidate',
                        sentiment: {
                          score: 0.55589,
                          label: 'positive',
                        },
                        relevance: 0.601989,
                        emotion: {
                          sadness: 0.218587,
                          joy: 0.327037,
                          fear: 0.057367,
                          disgust: 0.378184,
                          anger: 0.105524,
                        },
                        count: 1,
                      },
                    ],
                    entities: [
                      {
                        type: 'Person',
                        text: 'joe biden',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.33,
                        emotion: {
                          sadness: 0.218587,
                          joy: 0.327037,
                          fear: 0.057367,
                          disgust: 0.378184,
                          anger: 0.105524,
                        },
                        disambiguation: {
                          subtype: [
                            'Politician',
                            'Celebrity',
                            'CompanyFounder',
                            'FootballPlayer',
                            'OperaCharacter',
                            'PoliticalAppointer',
                            'U.S.Congressperson',
                            'USVicePresident',
                          ],
                          name: 'Joe Biden',
                          dbpedia_resource:
                            'http://dbpedia.org/resource/Joe_Biden',
                        },
                        count: 3,
                      },
                      {
                        type: 'Location',
                        text: 'us',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.33,
                        emotion: {
                          sadness: 0.218587,
                          joy: 0.327037,
                          fear: 0.057367,
                          disgust: 0.378184,
                          anger: 0.105524,
                        },
                        disambiguation: {
                          subtype: [
                            'Region',
                            'AdministrativeDivision',
                            'GovernmentalJurisdiction',
                            'FilmEditor',
                            'Country',
                          ],
                          name: 'United States',
                          dbpedia_resource:
                            'http://dbpedia.org/resource/United_States',
                        },
                        count: 1,
                      },
                    ],
                    concepts: [
                      {
                        text: 'United States Senate',
                        relevance: 0.97294,
                        dbpedia_resource:
                          'http://dbpedia.org/resource/United_States_Senate',
                      },
                      {
                        text: 'Vice President of the United States',
                        relevance: 0.952689,
                        dbpedia_resource:
                          'http://dbpedia.org/resource/Vice_President_of_the_United_States',
                      },
                      {
                        text: 'Democratic Party',
                        relevance: 0.929408,
                        dbpedia_resource:
                          'http://dbpedia.org/resource/Democratic_Party_(United_States)',
                      },
                    ],
                    warnings: ['emotion: cannot locate keyphrase'],
                  },
                },
                {
                  id: 'naturaljs-afinn165',
                  title: 'Natural JS Library - AFINN-165 Vocab.',
                  result: 0.027586206896551724,
                },
                {
                  id: 'naturaljs-senticon',
                  title: 'Natural JS Library - SENTICON Vocab.',
                  result: 0.01473103448275862,
                },
                {
                  id: 'naturaljs-pattern',
                  title: 'Natural JS Library - PATTERN Vocab.',
                  result: 0.006206896551724137,
                },
                {
                  id: 'sentimentjs',
                  title: 'Sentiment JS Library',
                  result: 0.014285714285714285,
                  meta: {
                    score: 2,
                    comparative: 0.07142857142857142,
                    tokens: [
                      'shawng927',
                      'so',
                      'in',
                      'this',
                      'brief',
                      'speech',
                      'we',
                      'learned',
                      '1',
                      'joe',
                      'biden',
                      'is',
                      'a',
                      'candidate',
                      'for',
                      'the',
                      'us',
                      'senate',
                      '2',
                      'if',
                      'you',
                      'don’t',
                      'like',
                      'him',
                      'vote',
                      'for',
                      'the',
                      'o…',
                    ],
                    words: ['like'],
                    positive: ['like'],
                    negative: [],
                  },
                },
              ],
              labels: [
                {
                  id: 'LSTM',
                  title: 'Long Short-Term Memory Model',
                  result: {
                    theme: 'unrelated',
                    group: 'public',
                  },
                },
                {
                  id: 'CNN',
                  title: 'Convolutional Neural Network Model',
                  result: {
                    theme: 'unrelated',
                    group: 'public',
                  },
                },
                {
                  id: 'SVM',
                  title: 'Support Vector Machine',
                  result: {
                    theme: 'personal',
                    group: 'public',
                  },
                },
                {
                  id: 'KNN',
                  title: 'K-nearest Neighbors',
                  result: {
                    theme: 'personal',
                    group: 'public',
                  },
                },
                {
                  id: 'RF',
                  title: 'Random Forests',
                  result: {
                    theme: 'personal',
                    group: 'public',
                  },
                },
                {
                  id: 'MLP',
                  title: 'Multilayer Perceptron',
                  result: {
                    theme: 'personal',
                    group: 'public',
                  },
                },
              ],
              _id: '5e54bd3ceff6c34770c8c7fb',
              created_at: '2020-02-25T06:22:44.000Z',
              id: '1232189162855522300',
              id_str: '1232189162855522306',
              text:
                'shawng927 so in this brief speech we learned 1 joe biden is a candidate for the us senate 2 if you don’t like him vote for the o…',
              source:
                '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
              truncated: false,
              in_reply_to_status_id: null,
              in_reply_to_status_id_str: null,
              in_reply_to_user_id: null,
              in_reply_to_user_id_str: null,
              in_reply_to_screen_name: null,
              user: {
                id: 3104950051,
                id_str: '3104950051',
                name: 'Tommy',
                screen_name: 'birdman8272',
                location: 'United States',
                url: null,
                description:
                  'Christian:God Bless President Trump! \nUS Army Signal Corps.Honor to be  followed by @GenFlynn  @AlvedaCKing\n#AmericaFirst\n#KAG',
                translator_type: 'none',
                protected: false,
                verified: false,
                followers_count: 30596,
                friends_count: 19832,
                listed_count: 105,
                favourites_count: 204938,
                statuses_count: 260366,
                created_at: 'Mon Mar 23 14:20:59 +0000 2015',
                utc_offset: null,
                time_zone: null,
                geo_enabled: true,
                lang: null,
                contributors_enabled: false,
                is_translator: false,
                profile_background_color: 'C0DEED',
                profile_background_image_url:
                  'http://abs.twimg.com/images/themes/theme1/bg.png',
                profile_background_image_url_https:
                  'https://abs.twimg.com/images/themes/theme1/bg.png',
                profile_background_tile: false,
                profile_link_color: '1DA1F2',
                profile_sidebar_border_color: 'C0DEED',
                profile_sidebar_fill_color: 'DDEEF6',
                profile_text_color: '333333',
                profile_use_background_image: true,
                profile_image_url:
                  'http://pbs.twimg.com/profile_images/1224194711637909504/qr-sdQzQ_normal.jpg',
                profile_image_url_https:
                  'https://pbs.twimg.com/profile_images/1224194711637909504/qr-sdQzQ_normal.jpg',
                profile_banner_url:
                  'https://pbs.twimg.com/profile_banners/3104950051/1526753847',
                default_profile: true,
                default_profile_image: false,
                following: null,
                follow_request_sent: null,
                notifications: null,
              },
              geo: null,
              coordinates: null,
              place: null,
              contributors: null,
              retweeted_status: {
                created_at: 'Tue Feb 25 05:38:09 +0000 2020',
                id: 1232177944199561200,
                id_str: '1232177944199561216',
                text:
                  'So in this brief speech we learned:\n1. Joe Biden is a candidate for the U.S. Senate!\n2. If you don’t like him vote… https://t.co/6CVt0LCdE3',
                source:
                  '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
                truncated: true,
                in_reply_to_status_id: null,
                in_reply_to_status_id_str: null,
                in_reply_to_user_id: null,
                in_reply_to_user_id_str: null,
                in_reply_to_screen_name: null,
                user: {
                  id: 948391038242164700,
                  id_str: '948391038242164737',
                  name: 'Shawnasaurus Rex',
                  screen_name: 'ShawnG927',
                  location: 'Cleveland, OH',
                  url: null,
                  description:
                    'Political humor 😄 Patriot 🇺🇸 MAGA KAG, Military, Police 1A 2A followback Followed by @rosedc11 @deplorablejujuv @rbigzs @lilibellmia @zyrofoxtrot',
                  translator_type: 'none',
                  protected: false,
                  verified: false,
                  followers_count: 70375,
                  friends_count: 74330,
                  listed_count: 23,
                  favourites_count: 67535,
                  statuses_count: 128768,
                  created_at: 'Wed Jan 03 03:10:18 +0000 2018',
                  utc_offset: null,
                  time_zone: null,
                  geo_enabled: true,
                  lang: null,
                  contributors_enabled: false,
                  is_translator: false,
                  profile_background_color: 'F5F8FA',
                  profile_background_image_url: '',
                  profile_background_image_url_https: '',
                  profile_background_tile: false,
                  profile_link_color: '1DA1F2',
                  profile_sidebar_border_color: 'C0DEED',
                  profile_sidebar_fill_color: 'DDEEF6',
                  profile_text_color: '333333',
                  profile_use_background_image: true,
                  profile_image_url:
                    'http://pbs.twimg.com/profile_images/1215367614018605057/ryIro3rl_normal.jpg',
                  profile_image_url_https:
                    'https://pbs.twimg.com/profile_images/1215367614018605057/ryIro3rl_normal.jpg',
                  profile_banner_url:
                    'https://pbs.twimg.com/profile_banners/948391038242164737/1580829017',
                  default_profile: true,
                  default_profile_image: false,
                  following: null,
                  follow_request_sent: null,
                  notifications: null,
                },
                geo: null,
                coordinates: null,
                place: null,
                contributors: null,
                is_quote_status: false,
                extended_tweet: {
                  full_text:
                    'So in this brief speech we learned:\n1. Joe Biden is a candidate for the U.S. Senate!\n2. If you don’t like him vote for the other Biden! \nWait ... What ??? 😂😂\nhttps://t.co/Ti4P6kTFGx',
                  display_text_range: [0, 181],
                  entities: {
                    hashtags: [],
                    urls: [],
                    user_mentions: [],
                    symbols: [],
                    media: [
                      {
                        id: 1232170836896948200,
                        id_str: '1232170836896948225',
                        indices: [158, 181],
                        additional_media_info: {
                          monetizable: false,
                        },
                        media_url:
                          'http://pbs.twimg.com/ext_tw_video_thumb/1232170836896948225/pu/img/pVHaQNOMv2JJG4s6.jpg',
                        media_url_https:
                          'https://pbs.twimg.com/ext_tw_video_thumb/1232170836896948225/pu/img/pVHaQNOMv2JJG4s6.jpg',
                        url: 'https://t.co/Ti4P6kTFGx',
                        display_url: 'pic.twitter.com/Ti4P6kTFGx',
                        expanded_url:
                          'https://twitter.com/heckyessica/status/1232171077629075456/video/1',
                        type: 'video',
                        video_info: {
                          aspect_ratio: [80, 37],
                          duration_millis: 22028,
                          variants: [
                            {
                              bitrate: 832000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232170836896948225/pu/vid/778x360/vTvk9nSVp1CNAYWi.mp4?tag=10',
                            },
                            {
                              content_type: 'application/x-mpegURL',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232170836896948225/pu/pl/jBIZlEaMmKaSVp9j.m3u8?tag=10',
                            },
                            {
                              bitrate: 256000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232170836896948225/pu/vid/582x270/XBAyMi9aqPkW7L35.mp4?tag=10',
                            },
                            {
                              bitrate: 2176000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232170836896948225/pu/vid/1280x592/xh2fm_FxwUzwUGuG.mp4?tag=10',
                            },
                          ],
                        },
                        sizes: {
                          thumb: {
                            w: 150,
                            h: 150,
                            resize: 'crop',
                          },
                          medium: {
                            w: 1200,
                            h: 555,
                            resize: 'fit',
                          },
                          small: {
                            w: 680,
                            h: 315,
                            resize: 'fit',
                          },
                          large: {
                            w: 1280,
                            h: 592,
                            resize: 'fit',
                          },
                        },
                        source_status_id: 1232171077629075500,
                        source_status_id_str: '1232171077629075456',
                        source_user_id: 845689249,
                        source_user_id_str: '845689249',
                      },
                    ],
                  },
                  extended_entities: {
                    media: [
                      {
                        id: 1232170836896948200,
                        id_str: '1232170836896948225',
                        indices: [158, 181],
                        additional_media_info: {
                          monetizable: false,
                        },
                        media_url:
                          'http://pbs.twimg.com/ext_tw_video_thumb/1232170836896948225/pu/img/pVHaQNOMv2JJG4s6.jpg',
                        media_url_https:
                          'https://pbs.twimg.com/ext_tw_video_thumb/1232170836896948225/pu/img/pVHaQNOMv2JJG4s6.jpg',
                        url: 'https://t.co/Ti4P6kTFGx',
                        display_url: 'pic.twitter.com/Ti4P6kTFGx',
                        expanded_url:
                          'https://twitter.com/heckyessica/status/1232171077629075456/video/1',
                        type: 'video',
                        video_info: {
                          aspect_ratio: [80, 37],
                          duration_millis: 22028,
                          variants: [
                            {
                              bitrate: 832000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232170836896948225/pu/vid/778x360/vTvk9nSVp1CNAYWi.mp4?tag=10',
                            },
                            {
                              content_type: 'application/x-mpegURL',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232170836896948225/pu/pl/jBIZlEaMmKaSVp9j.m3u8?tag=10',
                            },
                            {
                              bitrate: 256000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232170836896948225/pu/vid/582x270/XBAyMi9aqPkW7L35.mp4?tag=10',
                            },
                            {
                              bitrate: 2176000,
                              content_type: 'video/mp4',
                              url:
                                'https://video.twimg.com/ext_tw_video/1232170836896948225/pu/vid/1280x592/xh2fm_FxwUzwUGuG.mp4?tag=10',
                            },
                          ],
                        },
                        sizes: {
                          thumb: {
                            w: 150,
                            h: 150,
                            resize: 'crop',
                          },
                          medium: {
                            w: 1200,
                            h: 555,
                            resize: 'fit',
                          },
                          small: {
                            w: 680,
                            h: 315,
                            resize: 'fit',
                          },
                          large: {
                            w: 1280,
                            h: 592,
                            resize: 'fit',
                          },
                        },
                        source_status_id: 1232171077629075500,
                        source_status_id_str: '1232171077629075456',
                        source_user_id: 845689249,
                        source_user_id_str: '845689249',
                      },
                    ],
                  },
                },
                quote_count: 7,
                reply_count: 18,
                retweet_count: 87,
                favorite_count: 110,
                entities: {
                  hashtags: [],
                  urls: [
                    {
                      url: 'https://t.co/6CVt0LCdE3',
                      expanded_url:
                        'https://twitter.com/i/web/status/1232177944199561216',
                      display_url: 'twitter.com/i/web/status/1…',
                      indices: [116, 139],
                    },
                  ],
                  user_mentions: [],
                  symbols: [],
                },
                favorited: false,
                retweeted: false,
                possibly_sensitive: false,
                filter_level: 'low',
                lang: 'en',
              },
              is_quote_status: false,
              retweet_count: 0,
              favorite_count: 0,
              entities: {
                hashtags: [],
                urls: [],
                user_mentions: [
                  {
                    screen_name: 'ShawnG927',
                    name: 'Shawnasaurus Rex',
                    id: 948391038242164700,
                    id_str: '948391038242164737',
                    indices: [3, 13],
                  },
                ],
                symbols: [],
              },
              favorited: false,
              retweeted: false,
              topics: {
                democratic: ['joe biden'],
              },
              original_text:
                'RT @ShawnG927: So in this brief speech we learned:\n1. Joe Biden is a candidate for the U.S. Senate!\n2. If you don’t like him vote for the o…',
              arrived_at: '1582611772928',
              updated_at: '2020-02-25T06:22:44.000Z',
            },
          ],
        },
        {
          id: 253110749,
          w2v: 5.2,
          id_str: '253110749',
          name: 'Bobby From The Bronx',
          screen_name: 'newkingofmedia',
          location: 'NYC',
          url: null,
          description:
            'Lazy Proofreader Prophet.\nBig fan of sacred cows & hypocrisy.\nKnown to debunk from my toilet\nThe hero Murica deserves.\nBaseball Galaxy Brain\nTwitter Comedian',
          translator_type: 'none',
          protected: false,
          verified: false,
          followers_count: 2201,
          friends_count: 1678,
          listed_count: 149,
          favourites_count: 63108,
          statuses_count: 205964,
          created_at: 'Wed Feb 16 15:40:51 +0000 2011',
          utc_offset: null,
          time_zone: null,
          geo_enabled: true,
          lang: null,
          contributors_enabled: false,
          is_translator: false,
          profile_background_color: '000000',
          profile_background_image_url:
            'http://abs.twimg.com/images/themes/theme9/bg.gif',
          profile_background_image_url_https:
            'https://abs.twimg.com/images/themes/theme9/bg.gif',
          profile_background_tile: false,
          profile_link_color: '1B95E0',
          profile_sidebar_border_color: '000000',
          profile_sidebar_fill_color: '000000',
          profile_text_color: '000000',
          profile_use_background_image: false,
          profile_image_url:
            'http://pbs.twimg.com/profile_images/1118962660752723968/88wWAbYo_normal.jpg',
          profile_image_url_https:
            'https://pbs.twimg.com/profile_images/1118962660752723968/88wWAbYo_normal.jpg',
          profile_banner_url:
            'https://pbs.twimg.com/profile_banners/253110749/1530936300',
          default_profile: false,
          default_profile_image: false,
          following: null,
          follow_request_sent: null,
          notifications: null,
          tweets: [
            {
              keywords: ['trump'],
              analysis: [
                {
                  id: 'ibm',
                  title: 'IBM Natural Language Understanding API',
                  result: 0,
                  meta: {
                    usage: {
                      text_units: 1,
                      text_characters: 151,
                      features: 5,
                    },
                    sentiment: {
                      document: {
                        score: 0,
                        label: 'neutral',
                      },
                    },
                    semantic_roles: [
                      {
                        subject: {
                          text: 'him',
                        },
                        sentence:
                          'zigmanfreud trumps due for a couple big ls this year by scotus taxes mcghan etc and this is him laying that frame work to delegitimize those pending la',
                        object: {
                          text:
                            'that frame work to delegitimize those pending la',
                          keywords: [
                            {
                              text: 'frame',
                            },
                            {
                              text: 'work',
                            },
                            {
                              text: 'la',
                            },
                          ],
                        },
                        action: {
                          verb: {
                            text: 'lay',
                            tense: 'present',
                          },
                          text: 'laying',
                          normalized: 'lay',
                        },
                      },
                      {
                        subject: {
                          text: 'him',
                        },
                        sentence:
                          'zigmanfreud trumps due for a couple big ls this year by scotus taxes mcghan etc and this is him laying that frame work to delegitimize those pending la',
                        object: {
                          text: 'those',
                        },
                        action: {
                          verb: {
                            text: 'delegitimize',
                            tense: 'future',
                          },
                          text: 'to delegitimize',
                          normalized: 'to delegitimize',
                        },
                      },
                    ],
                    language: 'en',
                    keywords: [
                      {
                        text: 'big ls',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.826135,
                        emotion: {
                          sadness: 0.276552,
                          joy: 0.110742,
                          fear: 0.300632,
                          disgust: 0.041461,
                          anger: 0.055884,
                        },
                        count: 1,
                      },
                      {
                        text: 'scotus taxes',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.723129,
                        emotion: {
                          sadness: 0.276552,
                          joy: 0.110742,
                          fear: 0.300632,
                          disgust: 0.041461,
                          anger: 0.055884,
                        },
                        count: 1,
                      },
                      {
                        text: 'couple',
                        sentiment: {
                          score: 0,
                          label: 'neutral',
                        },
                        relevance: 0.615148,
                        emotion: {
                          sadness: 0.276552,
                          joy: 0.110742,
                          fear: 0.300632,
                          disgust: 0.041461,
                          anger: 0.055884,
                        },
                        count: 1,
                      },
                    ],
                    entities: [],
                    concepts: [
                      {
                        text: 'United States',
                        relevance: 0.863434,
                        dbpedia_resource:
                          'http://dbpedia.org/resource/United_States',
                      },
                    ],
                    warnings: ['emotion: cannot locate keyphrase'],
                  },
                },
                {
                  id: 'naturaljs-afinn165',
                  title: 'Natural JS Library - AFINN-165 Vocab.',
                  result: 0.007142857142857143,
                },
                {
                  id: 'naturaljs-senticon',
                  title: 'Natural JS Library - SENTICON Vocab.',
                  result: 0.013571428571428571,
                },
                {
                  id: 'naturaljs-pattern',
                  title: 'Natural JS Library - PATTERN Vocab.',
                  result: 0,
                },
                {
                  id: 'sentimentjs',
                  title: 'Sentiment JS Library',
                  result: 0.007142857142857143,
                  meta: {
                    score: 1,
                    comparative: 0.03571428571428571,
                    tokens: [
                      'zigmanfreud',
                      'trumps',
                      'due',
                      'for',
                      'a',
                      'couple',
                      'big',
                      'ls',
                      'this',
                      'year',
                      'by',
                      'scotus',
                      'taxes',
                      'mcghan',
                      'etc',
                      'and',
                      'this',
                      'is',
                      'him',
                      'laying',
                      'that',
                      'frame',
                      'work',
                      'to',
                      'delegitimize',
                      'those',
                      'pending',
                      'la',
                    ],
                    words: ['big'],
                    positive: ['big'],
                    negative: [],
                  },
                },
              ],
              labels: [
                {
                  id: 'LSTM',
                  title: 'Long Short-Term Memory Model',
                  result: {
                    theme: 'unrelated',
                    group: 'public',
                  },
                },
                {
                  id: 'CNN',
                  title: 'Convolutional Neural Network Model',
                  result: {
                    theme: 'unrelated',
                    group: 'public',
                  },
                },
                {
                  id: 'SVM',
                  title: 'Support Vector Machine',
                  result: {
                    theme: 'personal',
                    group: 'public',
                  },
                },
                {
                  id: 'KNN',
                  title: 'K-nearest Neighbors',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'RF',
                  title: 'Random Forests',
                  result: {
                    theme: 'educational',
                    group: 'public',
                  },
                },
                {
                  id: 'MLP',
                  title: 'Multilayer Perceptron',
                  result: {
                    theme: 'personal',
                    group: 'public',
                  },
                },
              ],
              _id: '5e54bd3ceff6c34770c8c7fc',
              created_at: '2020-02-25T06:22:43.000Z',
              id: '1232189162348040200',
              id_str: '1232189162348040194',
              text:
                'zigmanfreud trumps due for a couple big ls this year by scotus taxes mcghan etc and this is him laying that frame work to delegitimize those pending la',
              source:
                '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
              truncated: true,
              in_reply_to_status_id: '1232181715168198700',
              in_reply_to_status_id_str: '1232181715168198656',
              in_reply_to_user_id: '558360059',
              in_reply_to_user_id_str: '558360059',
              in_reply_to_screen_name: 'Zigmanfreud',
              user: {
                id: 253110749,
                id_str: '253110749',
                name: 'Bobby From The Bronx',
                screen_name: 'newkingofmedia',
                location: 'NYC',
                url: null,
                description:
                  'Lazy Proofreader Prophet.\nBig fan of sacred cows & hypocrisy.\nKnown to debunk from my toilet\nThe hero Murica deserves.\nBaseball Galaxy Brain\nTwitter Comedian',
                translator_type: 'none',
                protected: false,
                verified: false,
                followers_count: 2201,
                friends_count: 1678,
                listed_count: 149,
                favourites_count: 63108,
                statuses_count: 205964,
                created_at: 'Wed Feb 16 15:40:51 +0000 2011',
                utc_offset: null,
                time_zone: null,
                geo_enabled: true,
                lang: null,
                contributors_enabled: false,
                is_translator: false,
                profile_background_color: '000000',
                profile_background_image_url:
                  'http://abs.twimg.com/images/themes/theme9/bg.gif',
                profile_background_image_url_https:
                  'https://abs.twimg.com/images/themes/theme9/bg.gif',
                profile_background_tile: false,
                profile_link_color: '1B95E0',
                profile_sidebar_border_color: '000000',
                profile_sidebar_fill_color: '000000',
                profile_text_color: '000000',
                profile_use_background_image: false,
                profile_image_url:
                  'http://pbs.twimg.com/profile_images/1118962660752723968/88wWAbYo_normal.jpg',
                profile_image_url_https:
                  'https://pbs.twimg.com/profile_images/1118962660752723968/88wWAbYo_normal.jpg',
                profile_banner_url:
                  'https://pbs.twimg.com/profile_banners/253110749/1530936300',
                default_profile: false,
                default_profile_image: false,
                following: null,
                follow_request_sent: null,
                notifications: null,
              },
              geo: null,
              coordinates: null,
              place: null,
              contributors: null,
              is_quote_status: false,
              retweet_count: 0,
              favorite_count: 0,
              entities: {
                hashtags: [],
                urls: [
                  {
                    url: 'https://t.co/P4YQ0wUUu7',
                    expanded_url:
                      'https://twitter.com/i/web/status/1232189162348040194',
                    display_url: 'twitter.com/i/web/status/1…',
                    indices: [117, 140],
                  },
                ],
                user_mentions: [
                  {
                    screen_name: 'Zigmanfreud',
                    name: 'John Ziegler',
                    id: 558360059,
                    id_str: '558360059',
                    indices: [0, 12],
                  },
                ],
                symbols: [],
              },
              favorited: false,
              retweeted: false,
              topics: {
                republican: ['trump'],
              },
              original_text:
                "@Zigmanfreud Trump's due for a couple  big Ls this year by SCOTUS Taxes, Mcghan etc and this is him laying that frame work to delegitimize those pending La",
              arrived_at: '1582611772981',
              updated_at: '2020-02-25T06:22:43.000Z',
            },
          ],
        },
      ], */
      /*
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
              created_at: 'Thu Nov 12 19:18:20 +0000 2018',
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
              created_at: 'Thu Aug 11 19:20:20 +0000 2017',
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
      */
      flat: true,
      color: 'transparent',
      highlightedTopic: '',
      msg: '',
      temp: [],
      lastSelectedUser: '',
      allSelected: [],
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
    },
    usersRawSet: {
      set(val) {
        this.$store.commit('triage/updateUsersSet', val)
      },
      get() {
        return this.$store.state.triage.usersSet
      },
    },
    /***
     *  Add any required attribute of data to users
     * */
    userSet() {
      const users = []
      let createdAt = ''
      let id = ''
      let w2v = 1
      for (const item of this.usersRawSet) {
        const topicArray = []
        const keywordArray = []
        for (const tweet of item.tweets) {
          topicArray.push(Object.keys(tweet.topics))
          keywordArray.push(Object.values(tweet.topics))
          id = tweet.id
          createdAt = tweet.created_at
          w2v = tweet.id % 10
        }
        item.tweets.topics = []
        for (const tpc of topicArray) item.tweets.topics.push(tpc)
        item.tweets.keyword = []
        for (const kw of keywordArray)
          for (const k of kw) item.tweets.keyword.push(k)
        item.tweets.id = id
        item.tweets.created_at = createdAt
        item.w2v = w2v
        users.push(item)
        console.log('item is here', item)
      }
      console.log('users are **', users)
      return users
    },
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
    /***
     *
     * Candid in the ConcentricChart component have different attributes (name) instead of screen_name
     * so two different functions are implemented, but they do same thing (we can change candid to integrated it and delete updateSelectedCandid)
     */
    updateSelectedCandid(user) {
      this.lastSelectedUser = user.name
      if (!this.allSelected.includes(user.name)) {
        this.allSelected.push(user.name)
        // ToDo: add users profile when they are in the list
      } else {
        this.allSelected = this.allSelected.filter(function (ele) {
          return ele !== user.name
        })
      }
    },
    updateSelectedUsers(user) {
      this.lastSelectedUser = user.screen_name
      if (!this.allSelected.includes(user.screen_name)) {
        this.allSelected.push(user.screen_name)
        // ToDo: add users profile when they are in the list
      } else {
        this.allSelected = this.allSelected.filter(function (ele) {
          return ele !== user.screen_name
        })
      }
    },
    removeSelected(user) {
      this.allSelected = this.allSelected.filter(function (ele) {
        return ele !== user
      })
    },
    updateLastSelect(user) {
      this.lastSelectedUser = user
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
