<template>
  <div class="home">
    <Header />
    <div class="container">
      <div class="spread">
        <h1 :class="{ dark: !isDarkMode, light: isDarkMode }">
          Traffic Overview
        </h1>
        <div
          class="toggle"
          :class="{ 'light-box': isDarkMode, 'dark-box': !isDarkMode }"
        >
          <div ref="days" class="days" @click="toggleDays">Days</div>
          <div ref="weeks" class="weeks" @click="toggleWeeks">Weeks</div>
          <div ref="months" class="months" @click="toggleMonths">Months</div>
        </div>
      </div>
      <apexchart
        width="100%"
        type="area"
        :options="chartOptions"
        :series="series"
      ></apexchart>
      <div align="center">
        <iframe
          v-if="isDarkMode"
          width="600"
          height="450"
          src="https://datastudio.google.com/embed/reporting/f5c6bc8c-0291-4674-8e9a-57f434fe731b/page/e6wtB"
          frameborder="0"
          style="border:0"
          allowfullscreen
        ></iframe>
        <iframe
          v-if="!isDarkMode"
          width="600"
          height="450"
          src="https://datastudio.google.com/embed/reporting/9500603e-5e50-4a22-a5dd-144fbc1f0c0c/page/e6wtB"
          frameborder="0"
          style="border:0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import Header from "@/components/Header.vue";
import { db } from "@/firebase";

export default {
  name: "Home",
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  firestore() {
    return {
      traffic: {
        // collection reference.
        ref: db.collection("traffic"),
        // Bind the collection as an object if you would like to.
        objects: true,
        resolve: traffic => {
          const todaysDate = new Date();
          const lastWeekDate = todaysDate.setDate(todaysDate.getDate() - 7);

          const activeUsers = [];
          Object.keys(traffic.activeUsers).map(key => {
            if (new Date(traffic.activeUsers[key][0]) > lastWeekDate) {
              activeUsers.push(traffic.activeUsers[key]);
            }
          });

          const newUsers = [];
          Object.keys(traffic.newUsers).map(key => {
            if (new Date(traffic.newUsers[key][0]) > lastWeekDate) {
              newUsers.push(traffic.newUsers[key]);
            }
          });

          this.series = [
            {
              name: "active users",
              data: activeUsers
            },
            {
              name: "new users",
              data: newUsers
            }
          ];
        },
        reject: err => {
          // collection is rejected
          console.log(err);
        }
      }
    };
  },
  data() {
    return {
      chartOptions: {
        colors: ["#14F1D9", "#7b42f6"],
        legend: {
          labels: {
            colors: [this.$store.getters.isDarkMode ? "white" : "black"]
          },
          position: "top"
        },
        tooltip: {
          theme: "dark"
        },
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        chart: {
          id: "users"
        },
        xaxis: {
          type: "datetime"
        }
      },
      series: []
    };
  },
  components: {
    Header,
    apexchart: VueApexCharts
  },
  methods: {
    toggleDays() {
      this.$refs.days.style.color = "white";
      this.$refs.days.style.background = "#56CCF2";
      this.$refs.days.style.borderRadius = "4px";

      this.$refs.weeks.style.color = "#5b6175";
      this.$refs.weeks.style.background = "none";
      this.$refs.weeks.style.borderRadius = "none";

      this.$refs.months.style.color = "#5b6175";
      this.$refs.months.style.background = "none";
      this.$refs.months.style.borderRadius = "none";

      const activeUsers = [];
      const newUsers = [];
      // Binding Docs
      this.$binding("activeUsers", db.collection("traffic").doc("activeUsers"))
        .then(data => {
          const todaysDate = new Date();
          const lastWeekDate = todaysDate.setDate(todaysDate.getDate() - 7);

          Object.keys(data).map(key => {
            if (new Date(data[key][0]) > lastWeekDate) {
              activeUsers.push(data[key]);
            }
          });
        })
        .catch(err => {
          console.error(err);
        });

      // Binding Docs
      this.$binding("newUsers", db.collection("traffic").doc("newUsers"))
        .then(data => {
          const todaysDate = new Date();
          const lastWeekDate = todaysDate.setDate(todaysDate.getDate() - 7);

          Object.keys(data).map(key => {
            if (new Date(data[key][0]) > lastWeekDate) {
              newUsers.push(data[key]);
            }
          });
        })
        .catch(err => {
          console.error(err);
        });

      this.series = [
        {
          name: "active users",
          data: activeUsers
        },
        {
          name: "new users",
          data: newUsers
        }
      ];
      dispatchEvent(new Event("resize"));
    },
    toggleWeeks() {
      this.$refs.weeks.style.color = "white";
      this.$refs.weeks.style.background = "#56CCF2";
      this.$refs.weeks.style.borderRadius = "4px";

      this.$refs.days.style.color = "#5b6175";
      this.$refs.days.style.background = "none";
      this.$refs.days.style.borderRadius = "none";

      this.$refs.months.style.color = "#5b6175";
      this.$refs.months.style.background = "none";
      this.$refs.months.style.borderRadius = "none";

      const activeUsers = [];
      const newUsers = [];
      // Binding Docs
      this.$binding("activeUsers", db.collection("traffic").doc("activeUsers"))
        .then(data => {
          const todaysDate = new Date();
          const lastMonthDate = todaysDate.setDate(todaysDate.getDate() - 30);

          Object.keys(data).map(key => {
            if (new Date(data[key][0]) > lastMonthDate) {
              activeUsers.push(data[key]);
            }
          });
        })
        .catch(err => {
          console.error(err);
        });

      // Binding Docs
      this.$binding("newUsers", db.collection("traffic").doc("newUsers"))
        .then(data => {
          const todaysDate = new Date();
          const lastMonthDate = todaysDate.setDate(todaysDate.getDate() - 30);

          Object.keys(data).map(key => {
            if (new Date(data[key][0]) > lastMonthDate) {
              newUsers.push(data[key]);
            }
          });
        })
        .catch(err => {
          console.error(err);
        });

      this.series = [
        {
          name: "active users",
          data: activeUsers
        },
        {
          name: "new users",
          data: newUsers
        }
      ];
      dispatchEvent(new Event("resize"));
    },
    toggleMonths() {
      this.$refs.months.style.color = "white";
      this.$refs.months.style.background = "#56CCF2";
      this.$refs.months.style.borderRadius = "4px";

      this.$refs.days.style.color = "#5b6175";
      this.$refs.days.style.background = "none";
      this.$refs.days.style.borderRadius = "none";

      this.$refs.weeks.style.color = "#5b6175";
      this.$refs.weeks.style.background = "none";
      this.$refs.weeks.style.borderRadius = "none";

      const activeUsers = [];
      const newUsers = [];
      // Binding Docs
      this.$binding("activeUsers", db.collection("traffic").doc("activeUsers"))
        .then(data => {
          const todaysDate = new Date();
          const lastYearDate = todaysDate.setDate(todaysDate.getDate() - 365);

          Object.keys(data).map(key => {
            if (new Date(data[key][0]) > lastYearDate) {
              activeUsers.push(data[key]);
            }
          });
        })
        .catch(err => {
          console.error(err);
        });

      // Binding Docs
      this.$binding("newUsers", db.collection("traffic").doc("newUsers"))
        .then(data => {
          const todaysDate = new Date();
          const lastYearDate = todaysDate.setDate(todaysDate.getDate() - 365);

          Object.keys(data).map(key => {
            if (new Date(data[key][0]) > lastYearDate) {
              newUsers.push(data[key]);
            }
          });
        })
        .catch(err => {
          console.error(err);
        });

      this.series = [
        {
          name: "active users",
          data: activeUsers
        },
        {
          name: "new users",
          data: newUsers
        }
      ];
      dispatchEvent(new Event("resize"));
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  padding-left: 15%;
  padding-right: 15%;
}

.spread {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  widows: 100%;
}

h1.dark {
  @include heading-3($black);
}

h1.light {
  @include heading-3($white);
}

.toggle {
  @include medium-text;
  color: $dark-gray;
  height: 50px;
  width: 240px;
  border-radius: 6px;
  padding: 5px;
  display: flex;
  flex-wrap: nowrap;
  &:hover {
    cursor: pointer;
  }
}

@mixin toggle-settings {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  height: 100%;
  transition-duration: 500ms;
}

.days {
  @include toggle-settings;
  background: $teal;
  border-radius: 4px;
  color: $white;
}

.weeks {
  @include toggle-settings;
}

.months {
  @include toggle-settings;
}
</style>
