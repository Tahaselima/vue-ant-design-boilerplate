<template>
  <page-view :title="false">
    <div>
      <a-row :gutter="24">
        <a-col :xl="14" :lg="24" :md="24" :sm="24" :xs="24">
          <a-carousel style="margin-bottom: 24px" arrows class="carousel" autoplay :autoplaySpeed="2500">
            <div
              slot="prevArrow"
              class="custom-slick-arrow"
              style="left: 10px;z-Index: 1"
            >
              <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle" />
            </div>
            <div><img src="https://i.hizliresim.com/avqWyC.png" alt="Başvuru" class="my-5"></div>
            <div><img src="https://i.hizliresim.com/avqWyC.png" alt="Başvuru" class="my-5"></div>
            <div><img src="https://i.hizliresim.com/avqWyC.png" alt="Başvuru" class="my-5"></div>
            <div><img src="https://i.hizliresim.com/avqWyC.png" alt="Başvuru" class="my-5"></div>
          </a-carousel>
          <a-card
            class="news-list"
            :loading="newsLoading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="Haberler"
            :body-style="{ padding: 0 }">
            <div slot="extra">
              <a-input-search placeholder="Aramak İçin..." style="width: 200px" @search="onSearch" />
            </div>
            <div>
              <a-card-grid class="news-card-grid" :key="i" v-for="(item, i) in filteredNews">
                <a-card :bordered="false" style="display: flex" :body-style="{ padding: '0px 0px 0px 15px' }">
                  <img
                    slot="cover"
                    alt="example"
                    :src="item.img"
                  />
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.description }}
                    </div>
                  </a-card-meta>
                </a-card>
              </a-card-grid>
              <a-card class="ant-list-item" :body-style="{ padding:'20px' }" style="justify-content: flex-end" v-if="!openFullNews && filteredNews.length > 5"><a @click="() => this.openFullNews = true">Daha Fazlasını Göster</a></a-card>
            </div>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="5"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="Doğum Günleri" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: '15px'}">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar" />
                  <div slot="title">
                    <span>{{ item.user.nickname }} - </span>
                    <a href="#">{{ item.project.jobName }}</a>&nbsp;
                  </div>
                  <div slot="description">{{ item.birtday }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
          <a-card title="Aramıza Katılanlar" style="margin-bottom: 24px" :loading="teamsLoading" :bordered="false" :body-style="{padding: '15px'}">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in getTeam">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.avatar" />
                  <div slot="title">
                    <span>{{ item.first_name }} - </span>
                    <a href="#">{{ item.title }}</a>&nbsp;
                  </div>
                  <div slot="description">{{ item.birthday }}</div>
                </a-list-item-meta>
              </a-list-item>
              <li class="ant-list-item" style="justify-content: center" v-if="!openFullTeam"><a @click="() => this.openFullTeam = true">Daha Fazlasını Göster</a></li>
            </a-list>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="5"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="Takvim" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
          </a-card>
          <a-card title="Açık Pozisyonlar" style="margin-bottom: 24px" :loading="radarLoading" :bordered="false" >
            <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in getRadar">
              <a-card :bordered="false" :body-style="{ padding: 0 }">
                <a-card-meta>
                  <div slot="title" class="card-title">
                    <a :href="item.link">{{ item.title }}</a>
                  </div>
                  <div slot="description" class="card-description">
                    Bu tarihler arasında: {{ item.start_date.split('-')[2] + '-' + item.start_date.split('-')[1] }} / {{ item.end_date.split('-')[2] + '-' + item.end_date.split('-')[1] }}
                  </div>
                </a-card-meta>
              </a-card>
            </a-card-grid>
            <a-card class="ant-list-item" :body-style="{ padding:'20px' }" style="justify-content: center" v-if="!openFullJobs"><a @click="() => this.openFullJobs = true">Daha Fazlasını Göster</a></a-card>
          </a-card>
          <a-card title="İlanlar" style="margin-bottom: 24px" :loading="adsLoading" :bordered="false" >
            <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in getAd">
              <a :href="item.url" target="_blank">
                <a-card hoverable :body-style="{padding: '15px'}">
                  <img
                    slot="cover"
                    alt="example"
                    :src="item.img"
                  />
                  <a-card-meta :title="item.title">
                    <template slot="description">
                      {{ item.description }}
                    </template>
                    <template slot="tabBarExtraContent">
                      {{ item.description }}
                    </template>
                  </a-card-meta>
                </a-card>
              </a>
            </a-card-grid>
            <a-card class="ant-list-item" :body-style="{ padding:'20px' }" style="justify-content: center" v-if="!openFullAds"><a @click="() => this.openFullAds = true">Daha Fazlasını Göster</a></a-card>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
export default {
  name: 'Workplace',
  components: {
    PageView
  },
  data () {
    return {
      search: '',
      user: {},
      openFullTeam: false,
      openFullJobs: false,
      openFullAds: false,
      openFullNews: false,
      radarLoading: true,
      adsLoading: true,
      newsLoading: true,
      teamsLoading: true,
      activities: [],
      teams: [],
      ads: [],
      news: [],
      radarData: []
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    },
    filteredNews () {
      const searched = this.news.filter(item => item.title.match(this.search))
      return this.openFullNews ? searched : searched.slice(0, 6)
    },
    getTeam () {
      return this.openFullTeam ? this.teams : this.teams.slice(0, 3)
    },
    getRadar () {
      return this.openFullJobs ? this.radarData : this.radarData.slice(0, 3)
    },
    getAd () {
      return this.openFullAds ? this.ads : this.ads.slice(0, 3)
    }
  },
  mounted () {
    this.getActivity()
    this.getTeams()
    this.getAds()
    this.getNews()
    this.getJobs()
  },
  methods: {
    onSearch (value) {
      this.search = value
    },
    onPanelChange (value, mode) {
      console.log(value, mode)
    },
    getActivity () {
      this.$http.get('/workplace/activity')
        .then(res => {
          this.activities = res.result
        })
    },
    getTeams () {
      this.$http.get('/workplace/teams')
        .then(res => {
          this.teams = res.result
          this.teamsLoading = false
        })
    },
    getAds () {
      this.$http.get('/workplace/ads')
        .then(res => {
          this.ads = res.result
          this.adsLoading = false
        })
    },
    getNews () {
      this.$http.get('/workplace/news')
        .then(res => {
          this.news = res.result.map(item => {
            return {
              ...item,
              title: item.title.charAt(0).toUpperCase() + item.title.slice(1),
              description: item.description.substring(0, 140) + '...' }
              })
          this.newsLoading = false
        })
    },
    getJobs () {
      this.$http.get('/workplace/jobs')
        .then(res => {
          this.radarData = res.result
          this.radarLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .project-list {

    .card-title {
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }
    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;

        &:hover {
          color: #1890ff;
        }
      }
      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }
    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;
    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }

  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }

  .project-card-grid{
     width: 100%;
  }

  .news-card-grid{
     width: 50%;
  }

  .mobile {

    .project-list {

      .project-card-grid {
        width: 100%;
      }
    }

    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }

    .headerContent .title .welcome-text {
      display: none;
    }
  }

/* For demo */
.ant-carousel > .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel > .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel > .custom-slick-arrow:before {
  display: none;
}
.ant-carousel > .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel > .slick-slide h3 {
  color: #fff;
}
.slick-slide img {
   width:100%;
}
.carousel{
  border-radius: 15px;
}

</style>
