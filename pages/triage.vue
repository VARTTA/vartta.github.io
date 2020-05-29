<template>
  <v-row justify="center" dense no-gutters>
    <v-col cols="6">
      <v-card outlined class="mx-0 px-0">
        <v-card-title>User-Topic Association</v-card-title>
        <v-divider></v-divider>
        <v-card-text :id="charts.topicUserDiagram.id" class="mx-0 px-1">
          <topic-user
            :meta="charts.topicUserDiagram"
            :topics="topics"
            :users="usersRawSet"
            :selected-list="allSelected"
            @userSelected="updateSelectedUsers"
          ></topic-user>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="
              charts.topicUserDiagram.sunburst = !charts.topicUserDiagram
                .sunburst
            "
          >
            Topic/Keyword
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card outlined class="mx-0 px-0">
        <v-card-title>Appearance Timeline</v-card-title>
        <v-divider></v-divider>
        <v-card-text :id="charts.concentricChart.id" class="mx-0 px-1">
          <!--          <concentric-chart-->
          <!--            :meta="charts.concentricChart"-->
          <!--            :topics="topics"-->
          <!--            :users="usersRawSet"-->
          <!--            :number-of-tracks="charts.concentricChart.tracks"-->
          <!--            :selected-list="allSelected"-->
          <!--            @candidSelected="updateSelectedCandid"-->
          <!--          ></concentric-chart>-->
        </v-card-text>
        <v-card-actions>
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
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card outlined class="mx-0 px-0">
        <v-card-title>User Distance</v-card-title>
        <v-divider></v-divider>
        <v-card-text :id="charts.userSimilarity.id" class="mx-0 px-1">
          <!--          <user-similarity-->
          <!--            :meta="charts.userSimilarity"-->
          <!--            :topics="topics"-->
          <!--            :users="usersRawSet"-->
          <!--            :selected-list="allSelected"-->
          <!--            :number-of-tracks="charts.userSimilarity.tracks"-->
          <!--            :last-selected="lastSelectedUser"-->
          <!--            @neighborSelected="updateSelectedUsers"-->
          <!--          ></user-similarity>-->
        </v-card-text>
        <v-card-actions>
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
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TopicUser from '../components/Triage/TopicUserAssociationDiagram'
// import ConcentricChart from '../components/Triage/ConcentricChart'
// import UserSimilarity from '../components/Triage/UserSimilarity'
// import UserInfo from '../components/Triage/UserInfo'
export default {
  name: 'Triage',
  layout: 'triage',
  components: {
    // UserInfo,
    // UserSimilarity,
    TopicUser,
    // ConcentricChart,
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
          screen_name: 'eric',
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
          screen_name: 'osman',
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
      // Charts and all of their configurations
      charts: {
        topicUserDiagram: {
          id: 'topic-user-diagram',
          label: 'Agent-Topic Association ',
          width: 400,
          height: 400,
          sunburst: true,
        },
        concentricChart: {
          id: 'concentric-chart',
          label: 'Agent-Time Association ',
          width: 400,
          height: 400,
          padding: { top: 20, bottom: 0, left: 0, right: 0 },
          tracks: 3,
          timeUnit: '12',
        },
        userSimilarity: {
          id: 'user-similarity',
          label: 'Agents Similarity',
          width: 400,
          height: 400,
          padding: { top: 20, bottom: 0, left: 0, right: 0 },
          tracks: 3,
          focalUser: 0,
          adjacency: false,
        },
      },
    }
  },
  computed: {
    allSelected() {
      return this.$store.state.triage.selectedUsers
    },
    usersRawSet() {
      return this.$store.state.triage.users
    },
    topics() {
      return this.$store.state.topics
    },
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.resize()
  },
  methods: {
    resize() {
      const chordDiv = document.getElementById(this.charts.topicUserDiagram.id)
      const concentricDiv = document.getElementById(
        this.charts.concentricChart.id
      )
      const similarityDiv = document.getElementById(
        this.charts.userSimilarity.id
      )
      if (chordDiv) {
        this.charts.topicUserDiagram.width = chordDiv.clientWidth - 9
        this.charts.topicUserDiagram.height = chordDiv.clientWidth - 9
      }
      if (concentricDiv) {
        this.charts.concentricChart.width = concentricDiv.clientWidth - 20
        this.charts.concentricChart.height = concentricDiv.clientWidth - 20
      }
      if (similarityDiv) {
        this.charts.userSimilarity.width = similarityDiv.clientWidth - 20
        this.charts.userSimilarity.height = similarityDiv.clientWidth - 20
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
      if (
        !this.allSelected.map((u) => u.screen_name).includes(user.screen_name)
      ) {
        this.$store.commit('triage/addSelectedUser', user)
      } else {
        this.$store.commit('triage/removeSelectedUser', user)
      }
      // this.lastSelectedUser = user.screen_name
      // if (
      //   !this.allSelected
      //     .map((a) => a.screen_name.toLowerCase())
      //     .includes(user.screen_name.toLowerCase())
      // ) {
      //   this.$store.commit('triage/addSelectedUser', user.screen_name)
      //   // ToDo: add users profile when they are in the list
      // } else {
      //   this.$store.commit('triage/removeSelectedUser', user.screen_name)
      // }
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
