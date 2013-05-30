// Generated by CoffeeScript 1.6.2
(function() {
  (function($) {
    var ActivityView, IndexView, PageView, app, happifyStarterApp;

    IndexView = Backbone.View.extend({
      data: null,
      events: {
        "click button": "challengeClicked"
      },
      initialize: function(options) {
        return this.data = options.data;
      },
      render: function() {
        var html, i;

        html = "";
        i = 0;
        while (i < this.data.length) {
          html += "<div><button class='challenge' id='" + this.data[i].id + "'>" + this.data[i].name + "</button></div>";
          i++;
        }
        return this.$el.html(html);
      },
      challengeClicked: function(e) {
        return app.navigate("challenges/" + arguments[0].currentTarget.id, {
          trigger: true
        });
      }
    });
    PageView = Backbone.View.extend({
      data: null,
      events: {
        "click .activity": "activityClicked"
      },
      initialize: function(options) {
        return this.data = options.data;
      },
      render: function() {
        var html, i;

        html = "<h3>" + this.data.name + "</h3>Activities:<ul>";
        i = 0;
        while (i < this.data.activities.length) {
          html += "<div><a class='activity' id=" + this.data.activities[i].id + ">" + this.data.activities[i].name + "</a></div>";
          i++;
        }
        html += "</ul>";
        return this.$el.html(html);
      },
      activityClicked: function(e) {
        return app.navigate("activities/" + arguments[0].currentTarget.id, {
          trigger: true
        });
      }
    });
    ActivityView = Backbone.View.extend({
      id: null,
      initialize: function(options) {
        return this.id = options.id;
      },
      render: function() {
        var html;

        html = "<div>" + this.id + "</div>";
        return this.$el.html(html);
      }
    });
    happifyStarterApp = Backbone.Router.extend({
      happifyUrl: "http://happify-test-api.herokuapp.com/api/",
      routes: {
        "": "listChallengesAction",
        "challenges/:challenge": "challengeAction",
        "activities/:activities": "activitiesAction"
      },
      challengeAction: function(id) {
        var url;

        url = this.happifyUrl + "challenges/" + id;
        return this.loadChallengeData(url);
      },
      listChallengesAction: function() {
        var url;

        url = this.happifyUrl + "challenges";
        return this.loadChallengesList(url);
      },
      activitiesAction: function(id) {
        return this.loadActivitiesData(id);
      },
      loadChallengesList: function(pageUrl) {
        $("#menu").html("<h1>Ghan Test Happify App</h2>");
        return $.ajax({
          url: pageUrl,
          dataType: "json",
          success: function(data) {
            if (data) {
              if (this.pageView_) {
                this.pageView_.remove();
              }
              this.pageView_ = new IndexView({
                data: data
              });
              this.pageView_.render();
              return this.pageView_.$el.appendTo("#menu");
            } else {
              return $("#menu").html("<h1>Error! Couldn't fetch data</h2>");
            }
          },
          error: function(request, status, error) {
            return $("#menu").html("<h1>Error! Couldn't fetch data</h2>");
          }
        });
      },
      loadChallengeData: function(pageUrl) {
        return $.ajax({
          url: pageUrl,
          dataType: "json",
          success: function(data) {
            $("#content-pane").html("");
            if (this.pageView_) {
              this.pageView_.remove();
            }
            this.pageView_ = new PageView({
              data: data
            });
            this.pageView_.render();
            return this.pageView_.$el.appendTo("#content-pane");
          }
        });
      },
      loadActivitiesData: function(id) {
        console.log("activity: " + id);
        $("#content-pane").html("");
        if (this.pageView_) {
          this.pageView_.remove();
        }
        this.pageView_ = new ActivityView({
          id: id
        });
        this.pageView_.render();
        return this.pageView_.$el.appendTo("#content-pane");
      }
    });
    app = void 0;
    return $(function() {
      app = new happifyStarterApp;
      return Backbone.history.start();
    });
  })(jQuery);

}).call(this);
