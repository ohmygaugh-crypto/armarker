!(function (e, t) {
    if ("object" == typeof exports && "object" == typeof module)
      module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
      var r = t();
      for (var n in r) ("object" == typeof exports ? exports : e)[n] = r[n];
    }
  })(this, function () {
    return (function (e) {
      var t = {};
      function r(n) {
        if (t[n]) return t[n].exports;
        var i = (t[n] = { i: n, l: !1, exports: {} });
        return e[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
      }
      return (
        (r.m = e),
        (r.c = t),
        (r.d = function (e, t, n) {
          r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
        }),
        (r.r = function (e) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (r.t = function (e, t) {
          if ((1 & t && (e = r(e)), 8 & t)) return e;
          if (4 & t && "object" == typeof e && e && e.__esModule) return e;
          var n = Object.create(null);
          if (
            (r.r(n),
            Object.defineProperty(n, "default", { enumerable: !0, value: e }),
            2 & t && "string" != typeof e)
          )
            for (var i in e)
              r.d(
                n,
                i,
                function (t) {
                  return e[t];
                }.bind(null, i)
              );
          return n;
        }),
        (r.n = function (e) {
          var t =
            e && e.__esModule
              ? function () {
                  return e.default;
                }
              : function () {
                  return e;
                };
          return r.d(t, "a", t), t;
        }),
        (r.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (r.p = ""),
        r((r.s = 0))
      );
    })([
      function (e, t) {
        AFRAME.registerSystem("render-order", {
          schema: { type: "array" },
          init: function () {
            this.el.renderer.sortObjects = !0;
          },
          update: function () {
            for (this.order = {}, i = 0; i < this.data.length; i++)
              this.order[this.data[i]] = i;
          },
        }),
          AFRAME.registerComponent("render-order", {
            schema: { type: "string" },
            multiple: !0,
            init: function () {
              (this.set = this.set.bind(this)),
                this.el.addEventListener("object3dset", (e) => {
                  "nonrecursive" !== this.id &&
                    e.detail.object.traverse(this.set);
                });
            },
            update: function () {
              "nonrecursive" === this.id
                ? this.set(this.el.object3D)
                : this.el.object3D.traverse(this.set);
            },
            set: function (e) {
              isNaN(this.data)
                ? (e.renderOrder = this.system.order[this.data])
                : (e.renderOrder = parseFloat(this.data));
            },
          }),
          AFRAME.registerComponent("render-order-recursive", {
            init: function () {
              this.el.addEventListener("child-attached", (e) => {
                e.detail.el.setAttribute(
                  "render-order",
                  this.el.getAttribute("render-order")
                );
              });
            },
          });
      },
    ]);
  });