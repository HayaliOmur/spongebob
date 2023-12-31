const AGAR_CONST = Object.freeze((() => {
    // WSVGA
    const VIEWPORT_BASE_WIDTH = 1024;
    const VIEWPORT_BASE_HEIGHT = 600;
    // field of view size is simply multiplied by these
    const FREE_SPECTATE = 4.95;
    const DEFAULT = 1.995;
    // Length of an edge of the agario map. Note, that the map is square.
    const MAP_EDGE_LENGTH = Math.sqrt(200000000);
    const VIEWPORT_FREE_SPECTATE_WIDTH = VIEWPORT_BASE_WIDTH * FREE_SPECTATE;
    const VIEWPORT_FREE_SPECTATE_HEIGHT = VIEWPORT_BASE_HEIGHT * FREE_SPECTATE;
    const VIEWPORT_FREE_SPECTATE_WIDTH_HALF = VIEWPORT_FREE_SPECTATE_WIDTH / 2;
    const VIEWPORT_FREE_SPECTATE_HEIGHT_HALF = VIEWPORT_FREE_SPECTATE_HEIGHT / 2;

    return {
        MAP_EDGE_LENGTH,
        VIEWPORT_BASE_WIDTH,
        VIEWPORT_BASE_HEIGHT,
        VIEWPORT_MULTIPLIER: Object.freeze({
            FREE_SPECTATE,
            DEFAULT,
        }),

        VIEWPORT_FREE_SPECTATE_WIDTH,
        VIEWPORT_FREE_SPECTATE_HEIGHT,
        VIEWPORT_FREE_SPECTATE_WIDTH_HALF,
        VIEWPORT_FREE_SPECTATE_HEIGHT_HALF
    }
})());
require = function() {
    return function f(g, h, j) {
        function k(p, q) {
            if (!h[p]) {
                if (!g[p]) {
                    var s = 'function' == typeof require && require;
                    if (!q && s) return s(p, true);
                    if (l) return l(p, true);
                    var v = new Error('Cannot find module \'' + p + '\'');
                    throw (v.code = 'MODULE_NOT_FOUND', v);
                }
                var w = h[p] = {
                    exports: {}
                };
                g[p][0].call(w.exports, function(x) {
                    return k(g[p][1][x] || x);
                }, w, w.exports, f, g, h, j);
            }
            return h[p].exports;
        }
        for (var l = 'function' == typeof require && require, m = 0; m < j.length; m++) k(j[m]);
        return k;
    };
}()({
    1: [function(a, b, c) {
        b.exports = function g(h, j) {
            var k, l = 0,
                j = j || 0,
                m = 0,
                p = j,
                q = h.length;
            do {
                if (p >= q) throw (g.bytes = 0, new RangeError('Could not decode varint'));
                k = h[p++];
                l += m < 28 ? (k & f) << m : (k & f) * Math.pow(2, m);
                m += 7;
            } while (k >= d);
            g.bytes = p - j;
            return l;
        };
        var d = 128,
            f = 127;
    }, {}],
    2: [function(a, b, c) {
        b.exports = function h(j, k, l) {
            k = k || [];
            l = l || 0;
            var m = l;
            for (; j >= g;) {
                k[l++] = 255 & j | d;
                j /= 128;
            }
            for (; j & f;) {
                k[l++] = 255 & j | d;
                j >>>= 7;
            }
            k[l] = 0 | j;
            h.bytes = l - m + 1;
            return k;
        };
        var d = 128,
            f = -128,
            g = Math.pow(2, 31);
    }, {}],
    3: [function(b, g, h) {
        var j = Math.pow(2, 7),
            k = Math.pow(2, 14),
            l = Math.pow(2, 21),
            m = Math.pow(2, 28),
            q = Math.pow(2, 35),
            s = Math.pow(2, 42),
            v = Math.pow(2, 49),
            w = Math.pow(2, 56),
            x = Math.pow(2, 63);
        g.exports = function(y) {
            return y < j ? 1 : y < k ? 2 : y < l ? 3 : y < m ? 4 : y < q ? 5 : y < s ? 6 : y < v ? 7 : y < w ? 8 : y < x ? 9 : 10;
        };
    }, {}],
    varint: [function(a, b, c) {
        b.exports = {
            encode: a('./encode.js'),
            decode: a('./decode.js'),
            encodingLength: a('./length.js')
        };
    }, {
        './decode.js': 1,
        './encode.js': 2,
        './length.js': 3
    }]
}, {}, []);
var varint = require('varint'),
    Texture = new(class {
        constructor() {
            this.skinMap = new Map();
            this.vanillaSkinMap = new Map();
            this.vanillaCustomSkinMap = new Map();
            this.downloadedSkins = new Map();
            this.pi2 = 2 * Math.PI;
        }
        render() {
            this.skinMap.clear();
        }
        cacheKey(a, b) {
            if (!a || !b) return;
            this.skinMap.set(a, b);
        }
        getCustomSkin(a) {
            const b = this.skinMap.get(a);
            if (!b) return false;
            const c = this.downloadedSkins.get(b);
            return undefined === c ? (this.downloadSkin(b), false) : c;
        }
        getVanillaSkin(a) {
            const b = this.vanillaSkinMap.get(a);
            if (!b) return false;
            const c = this.downloadedSkins.get(b);
            return c === undefined ? (this.downloadSkin(b), false) : c;
        }
        getVanillaCustomSkin(a) {
            const b = this.vanillaCustomSkinMap.get(a);
            if (!b) {
                this.vanillaCustomSkinMap.set(a, 'https://configs.agario.miniclippt.com/live/custom_skins/' + a.replace('%custom', 'skin_custom') + '.png');
                return false;
            }
            const c = this.downloadedSkins.get(b);
            return c === undefined ? (this.downloadSkin(b), false) : c;
        }
        getVanillaSkinsLinks(a) {
            const b = a.gameConfig['Gameplay - Equippable Skins'],
                c = a.gameConfig['Gameplay - Free Skins'];
            for (let d = 0; d < c.length; d++) {
                this.vanillaSkinMap.set(c[d].id, 'https://configs-web.agario.miniclippt.com/live/v15/' + master.latest_config_id + '/' + c[d].image);
            }
            for (let f = 0; f < b.length; f++) {
                if (b[f].image != 'uses_spine')
                    this.vanillaSkinMap.set(b[f].productId.replace('skin_', '%'), 'https://configs-web.agario.miniclippt.com/live/v15/' + master.latest_config_id + '/' + b[f].image);
            }
        }
        downloadSkin(a) {
            this.downloadedSkins.set(a, false);
            const b = new Image();
            b.crossOrigin = 'anonymous';

            b.onload = () => {
                const c = document.createElement('canvas');
                c.width = 512;
                c.height = 512;
                const d = c.getContext('2d');
                d.beginPath();
                d.arc(256, 256, 256, 0, this.pi2, true);
                d.clip();
                d.drawImage(b, 0, 0, 512, 512);
                new Image();
                b.onload = null;
                b.src = c.toDataURL();
                this.downloadedSkins.set(a, b);
            };

            b.src = a;
        }
    })(),
    Texts = new(class {
        constructor() {
            this.nickCaches = new Map();
            this.massCaches = new Map();
            this.maxCacheLife = 1000;
            this.massUpdateInterval = settings.massUpdateInterval || 500;
            this.quality = 0.4;
            this.nickShadowCtx = this.newShadowContext();
            this.massShadowCtx = this.newShadowContext();
            this.canvasPool = [];
        }
        setMassUpdateInterval() {
            this.massUpdateInterval = settings.massUpdateInterval || 500;
        }
        nick(a) {
            var b = theme.namesScale;
            if (a.targetNick === '') return false;
            const c = a.targetSize * drawRender.scale * b;
            if (c < 10 && settings.autoHideNames) return false;
            const d = this.nickCaches.get(a.targetNick) || this.newNickCache(a.targetNick);
            d.lastUsedAt = Date.now();
            const f = 0 | Math.min(c / 50, 7),
                g = d.level[f];
            if (g) return g;
            const h = this.getNewCanvas(),
                i = h.getContext('2d'),
                j = 50 * (f + 1) * this.quality,
                k = theme.strokeScale * (j / 10),
                l = 50 * 5 * 0.8,
                m = theme.strokeScale * (l / 10);
            h.height = j + k * 4;
            h.width = 0 | this.getNickWidth(a.targetNick, j) + k;
            h.originW = (this.getNickWidth(a.targetNick, l) + m) / 650;
            h.originH = h.height * (h.originW / h.width);
            i.font = theme.namesFontWeight + ' ' + j + 'px ' + theme.namesFontFamily;
            i.textBaseline = 'middle';
            i.textAlign = 'center';
            if (settings.namesStroke2 === 1) {
                i.strokeStyle = theme.namesStrokeColor;
                i.lineWidth = k * theme.strokeScale;
                i.lineJoin = 'miter';
                i.miterLimit = 0;
                i.strokeText(a.targetNick, h.width >> 1, h.height >> 1);
            } else if (settings.namesStroke2 === 2) {
                i.fillStyle = theme.namesStrokeColor;
                i.globalAlpha = 0.75;
                i.fillRect(0, 0, h.width, h.height);
                i.globalAlpha = 1;
            }
            i.fillStyle = theme.namesColor;
            i.fillText(a.targetNick, h.width >> 1, h.height >> 1);
            d.level[f] = h;
            return h;
        }
        newNickCache(a) {
            const b = new nickObject();
            this.nickCaches.set(a, b);
            return b;
        }
        getNickHeight(a, b) {
            return b + ~~(b * 0.4);
        }
        getNickWidth(a, b) {
            return this.nickShadowCtx.measureText(a).width * b / 25;
        }
        setNickCtxFont() {
            this.nickCaches.clear();
            this.nickShadowCtx.font = '700 25px ' + theme.namesFontFamily;
        }
        mass(a) {
            var b = a.isVirus ? theme.virMassScale / 2 : theme.namesScale / 3;
            const c = a.targetSize * drawRender.scale * b,
                d = 0 | Math.min(c / 50, 7);
            if (!a.isVirus && c < 10 && settings.autoHideMass || a.size < 40) return false;
            const f = this.massCaches.get(a.id) || this.newMassCache(a.id);
            f.lastUsedAt = Date.now();
            let g = settings.shortMass && a.mass > 999 ? (0 | a.mass / 100) / 10 + 'k' : a.mass;
            if (a.isVirus && a.mass < 200) {
                const i = ~~(a.targetSize * a.targetSize / 100);
                settings.virMassType === 2 ? g = this.calcVirusShots(i) : g = i;

                if (g !== f.mass)
                    f.needsRedraw = true;
            }
            f.fontSize = 50 * (d + 1) * 0.9;
            const h = Date.now() - f.lastUpdateAt;

            if (f.needsRedraw || h > this.massUpdateInterval)
                f.mass = g;

            f.canvas || (f.canvas = this.getNewCanvas(), f.ctx = f.canvas.getContext('2d'));
            if (f.needsRedraw) {
                f.needsRedraw = false;
                const j = f.canvas,
                    k = f.ctx,
                    l = theme.strokeScale * (f.fontSize / 10),
                    m = 50 * 5 * 0.8,
                    n = theme.strokeScale * (m / 10);
                j.height = f.fontSize + l;
                j.width = 0 | this.getMassWidth(f.mass, f.fontSize) + l;
                j.originW = (this.getMassWidth(f.mass, m) + n) / 650;
                j.originH = j.height * (j.originW / j.width);
                k.font = theme.massFontWeight + ' ' + (0 | f.fontSize) + 'px ' + theme.massFontFamily;
                k.textBaseline = 'middle';
                k.textAlign = 'center';
                settings.massStroke2 === 1 ? (k.strokeStyle = theme.massStrokeColor, k.lineWidth = l, k.lineJoin = 'miter', k.miterLimit = 0, k.strokeText(f.mass, j.width >> 1, j.height >> 1)) : settings.massStroke2 === 2 && (k.fillStyle = theme.massStrokeColor, k.globalAlpha = 0.75, k.fillRect(0, 0, j.width, j.height), k.globalAlpha = 1);
                k.fillStyle = theme.massColor;
                k.fillText(f.mass, j.width >> 1, j.height >> 1);
                f.lastUpdateAt = Date.now();
            }
            return f.canvas;
        }
        newMassCache(a) {
            const b = new massObject();
            this.massCaches.set(a, b);
            return b;
        }
        getMassWidth(a, b) {
            return this.massShadowCtx.measureText(a).width * b / 25;
        }
        setMassCtxFont() {
            this.massCaches.clear();
            this.massShadowCtx.font = '700 25px ' + theme.massFontFamily;
        }
        getScreenRadius(a) {
            return a * drawRender.scale;
        }
        isSmall(a) {
            return settings.autoHideText === 'on' && this.getScreenRadius(a.targetSize) < 20;
        }
        calcVirusShots(a) {
            return ~~((200 - a) / 14);
        }
        getNewCanvas() {
            return this.canvasPool.shift() || document.createElement('canvas');
        }
        newShadowContext() {
            const a = document.createElement('canvas').getContext('2d');
            a.font = '700 25px ubuntu';
            return a;
        }
        clear(a) {
            if (a === 'nick') this.nickCaches.forEach((b, c) => {
                this.nickCaches.delete(c);
                var d, f = b.level;
                for (var g = 0; g < f.length; g++) {
                    if (d = f[g])
                        this.resetCanvas(d);
                }
            });

            if (a === 'mass') this.massCaches.forEach((b, c) => {
                this.massCaches.delete(c);
                if (this.canvasPool.length >= 50) return;
                var d = b.canvas;
                this.resetCanvas(d);
            });
        }
        cleaner() {
            this.nickCaches.forEach((a, b) => {
                if (Date.now() - a.lastUsedAt > this.maxCacheLife) {
                    this.nickCaches.delete(b);
                    var c, d = a.level;
                    for (var f = 0; f < d.length; f++) {
                        if (c = d[f])
                            this.resetCanvas(c);
                    }
                }
            });

            this.massCaches.forEach((a, b) => {
                if (Date.now() - a.lastUsedAt > this.maxCacheLife) {
                    this.massCaches.delete(b);
                    if (this.canvasPool.length >= 50) return;
                    var c = a.canvas;
                    this.resetCanvas(c);
                }
            });
        }
        resetCanvas(a) {
            !a || this.canvasPool.length >= 75 || (a.width = 0, this.canvasPool.push(a));
        }
    })();
class nickObject {
    constructor() {
        this.lastUsedAt = Date.now();
        this.level = [null, null, null, null, null, null, null, null];
    }
}
class massObject {
    constructor() {
        this.lastUsedAt = Date.now();
        this.lastUpdateAt = Date.now();
        this.canvas = null;
        this.ctx = null;
        this._mass = 0;
        this.lastMass = 0;
        this._fontSize = 5;
        this.needsRedraw = true;
    }
    set mass(a) {
        this._mass = a;

        if (this._mass !== this.lastMass) {
            this.lastMass = this._mass;
            this.needsRedraw = true;
        }
    }
    get mass() {
        return this._mass;
    }
    set fontSize(a) {
        a < 5 || (0 | a) == (0 | this._fontSize) || this._fontSize > a && a / this._fontSize > 0.8 || a > this._fontSize && this._fontSize / a > 0.8 || (this._fontSize = a, this.needsRedraw = true);
    }
    get fontSize() {
        return this._fontSize;
    }
}
class Cell {
    constructor(a, b, c, d, f, g, h, i) {
        this.type = g ? 'food' : h ? 'virus' : i ? 'player' : 'cell';
        this.c = null;
        this.id = a;
        this.x = b;
        this.y = c;
        this.accountID = null;
        this.isInViewport = false;
        this.targetX = b;
        this.targetY = c;
        this.color = f;
        this.oppColor = null;
        this.size = d;
        this.targetSize = d;
        this.alpha = 1;
        this.nick = '';
        this.targetNick = '';
        this.mass = 0;
        this.marginForMass = 0;
        this.isFood = g;
        this.isVirus = h;
        this.isPlayerCell = i;
        this.removed = false;
        this.redrawed = 0;
        this.time = 0;
        this.skin = null;
        this.hasVanillaCustomSkin = false;
        this.pi2 = 2 * Math.PI;
        this.container = null;
        this.graphic = null;
    }
    initPixi() {
        this.container = new PIXI.Container();
        this.graphic = new PIXI.Graphics();
        this.container.addChild(this.graphic);
        drawRender.app.stage.addChild(this.container);
    }
    upldatePixi(a, b, c, d, f, g) {
        this.drawCellPixi();
    }
    drawCellPixi() {
        this.graphic.clear();
        this.graphic.beginFill(this.color.replace('#', '0x'), 1);
        this.graphic.drawCircle(0, 0, 10);
        this.graphic.endFill();
    }
    renderPixi() {
        this.container.position.x = this.x;
        this.container.position.y = this.y;
        this.container.scale.x = this.container.scale.y = this.size / 10;
    }
    removeFromStagePixi() {
        drawRender.app.stage.removeChild(this.container);
    }
    update(a, b, c, d, f, g) {
        this.x = a;
        this.y = b;
        this.isVirus = d;
        this.isPlayerCell = f;
        this.setMass(c);
        this.setNick(g);
    }
    moveCell() {
        const a = this.c.time - this.time;
        let b = a / settings.animation;
        b = b < 0 ? 0 : b > 1 ? 1 : b;
        this.x += (this.targetX - this.x) * b;
        this.y += (this.targetY - this.y) * b;
        this.size += (this.targetSize - this.size) * b;
        this.alpha = b;
        if (!this.removed) {
            this.time = this.c.time;
            return;
        }
        if (b == 1) {
            const c = this.c.removedCells.indexOf(this);

            if (c != -1)
                this.c.removedCells.splice(c, 1);
        }
    }
    draw(a, b, c) {
        this.redrawed++;

        if (b)
            this.moveCell();

        const d = a.globalAlpha;

        if (this.removed)
            a.globalAlpha *= 1 - this.alpha;

        const f = a.globalAlpha;
        let g = false;
        const h = this.isFood ? this.size + theme.foodSize : this.size;
        a.beginPath();
        a.arc(this.x, this.y, h, 0, this.pi2, false);
        a.closePath();
        if (this.isFood) {
            a.fillStyle = this.color;
            a.fill();
            a.globalAlpha = d;
            return;
        }
        if (this.isVirus) {
            if (settings.transparentViruses) {
                a.globalAlpha *= theme.virusAlpha;
                g = true;
            }

            settings.virColors && this.c.play ? (a.fillStyle = application.setVirusColor(h), a.strokeStyle = application.setVirusStrokeColor(h)) : (a.fillStyle = theme.virusColor, a.strokeStyle = theme.virusStrokeColor);
            if (this.size >= 148) a.fillStyle = '#000000';
            a.fill();

            if (g) {
                a.globalAlpha = f;
                g = false;
            }

            a.lineWidth = theme.virusStrokeSize;
            a.stroke();
            if (settings.virMassType === 0) {} else {
                if (settings.virMassType === 3 && this.size < 148) {
                    a.fillStyle = a.strokeStyle;
                    a.beginPath();
                    a.arc(this.x, this.y, 3 * (this.size - 100), 0, this.pi2, true);
                    a.closePath();
                    a.fill();
                } else {
                    this.mass = ~~(this.size * this.size / 100);
                    var i = Texts.mass(this);
                    if (i) {
                        var j = i.originW * this.size * theme.virMassScale,
                            k = i.originH * this.size * theme.virMassScale;
                        a.drawImage(i, ~~(this.x - (j >> 1)), ~~(this.y - (k >> 1)), ~~j, ~~k);
                    }
                }
            }
            a.globalAlpha = d;
            return;
        }

        if (settings.transparentCells) {
            a.globalAlpha *= theme.cellsAlpha;
            g = true;
        }

        let l = this.color;
        if (application.play) {
            if (this.isPlayerCell)
                if (settings.myCustomColor)
                    l = profiles.masterProfile.color;
                else if (settings.oppColors && !settings.oppRings)
                l = this.oppColor;
        }
        a.fillStyle = l;
        a.fill();

        if (g) {
            a.globalAlpha = f;
            g = false;
        }

        let m = null;
        if (tempsett.showAnySkins) {
            if (settings.customSkins) m = Texture.getCustomSkin(this.targetNick);

            if (!m && settings.vanillaSkins)
                this.hasVanillaCustomSkin ? m = Texture.getVanillaCustomSkin(this.skin) : m = Texture.getVanillaSkin(this.skin);

            if (m) {
                if ((settings.transparentSkins || this.c.play && settings.oppColors) && !(this.isPlayerCell && !settings.myTransparentSkin) || this.isPlayerCell && settings.myTransparentSkin) {
                    a.globalAlpha *= theme.skinsAlpha;
                    g = true;
                }

                a.drawImage(m, this.x - h, this.y - h, 2 * h, 2 * h);

                if (g) {
                    a.globalAlpha = f;
                    g = false;
                }
            }
        }

        if (settings.teammatesInd && !this.isPlayerCell && h <= 200 && (m || Texture.skinMap.has(this.targetNick)))
            drawRender.drawTeammatesInd(a, ~~this.x, ~~this.y, h);

        let n = false;
        if (!this.isPlayerCell) {
            n = drawRender.setAutoHideCellInfo(h);
            if (n && settings.autoHideNames && settings.autoHideMass) {
                a.globalAlpha = d;
                return;
            }
        }
        
        if (this.isPlayerCell && c && settings.mbRings && application.activeTab === this.c.type) {
            const q = h / 50 * 10;
            a.lineWidth = q;
            a.globalAlpha = f;
            a.strokeStyle = theme.mboxActiveCellStroke;
            a.beginPath();
            a.arc(this.x, this.y, h - q / 2, 0, this.pi2, false);
            a.closePath();
            a.stroke();
            a.globalAlpha = 1;
        }
    
      
        a.globalAlpha *= theme.textAlpha;
        if (settings.showNames && !(this.isPlayerCell && settings.hideMyName) && !(m && settings.hideTeammatesNames)) {
            var o = Texts.nick(this);
            if (o) {
                var j = o.originW * this.size * theme.namesScale,
                    k = o.originH * this.size * theme.namesScale;
                a.drawImage(o, this.x - (j >> 1), this.y - (k >> 1), j, k);
            }
        }
        if (settings.showMass && !(this.isPlayerCell && settings.hideMyMass) && !(settings.hideEnemiesMass && !this.isPlayerCell && !this.isVirus)) {
            this.mass = ~~(this.size * this.size / 100);
            var i = Texts.mass(this);
            if (i) {
                var j = i.originW * this.size * theme.massScale / 2,
                    k = i.originH * this.size * theme.massScale / 2,
                    p = !settings.showNames || this.isPlayerCell && settings.hideMyName ? this.y - (k >> 1) : this.size / 4 + this.y;
                a.drawImage(i, this.x - (j >> 1), p, j, k);
            }
        }
        a.globalAlpha = d;
    }
}

function Node(a, b) {
    this.view = a;
    this.offset = b;
    this.contentType = 1;
    this.uncompressedSize = 0;

    this.setContentType = function() {
        this.contentType = this.readUint32();
    };

    this.setUncompressedSize = function() {
        this.uncompressedSize = this.readUint32();
    };

    this.compareBytesGt = (c, d) => {
        const f = c < 0,
            g = d < 0;
        if (f != g) return f;
        return c > d;
    };

    this.skipByte = function() {
        const c = this.readByte();
        if (c < 128) return;
        this.skipByte();
    };

    this.readByte = function() {
        return this.view.getUint8(this.offset++);
    };

    this.readUint32 = function() {
        let c = 0,
            d = 0;
        while (true) {
            const f = this.readByte();
            if (this.compareBytesGt(32, d)) {
                if (f >= 128) c |= (f & 127) << d;
                else {
                    c |= f << d;
                    break;
                }
            } else {
                this.skipByte();
                break;
            }
            d += 7;
        }
        return c;
    };

    this.readFlag = function() {
        return this.readUint32() >>> 3;
    };
}
//var proto = 'syntax=\"proto3\";\x0amessage index {\x0a  sint32 hasmessage = 1;\x0a  Message_data data = 2;\x0a}\x0amessage Message_data {\x0a  uint32 opcode = 1;\x0a  optional Login_response data = 11;\x0a}\x0a\x0a  message Empty {\x0a  }\x0a\x0amessage Login_response {\x0a\x0a  message TOKENS {\x0a    required string auth = 1;\x0a    required string alt = 2;\x0a    required string gdpr = 3;\x0a    required string xsolla = 4;\x0a  }\x0a\x0a  required TOKENS tokens = 1;\x0a  required uint32 currentGameState = 2;\x0a  required uint32 latestConfiguration = 5;\x0a\x0a  message SERVERINFO {\x0a    required string host = 1;\x0a    required uint32 tcpPort = 2;\x0a    required uint32 udpPort = 3;\x0a    required string awsRegion = 4;\x0a  }\x0a\x0a  required SERVERINFO serverInfo = 6;\x0a\x0a  message USERINFO {\x0a    required string userId = 1;\x0a    required string displayName = 2;\x0a    required int32 xp = 3;\x0a    required int32 level = 4;\x0a    required bool isPayingUser = 5;\x0a    required bool hasLoggedIntoMobile = 6;\x0a    required bool isNewUser = 7;\x0a\x0a    message REALMINFO {\x0a      required int32 realm = 1;\x0a      required string realmId = 2;\x0a      required string avatarUrl = 3;\x0a    }\x0a\x0a    required REALMINFO realmInfo = 8;\x0a    required int32 extraInitialMass = 9;\x0a\x0a    message ACTIONCOUNTERS {\x0a      required int32 questsCompleted = 1;\x0a      required int32 potionsObtained = 2;\x0a      required int32 skinsCreated = 3;\x0a    }\x0a\x0a    required ACTIONCOUNTERS actionCounters = 10;\x0a    required string latestCountryCode = 11;\x0a    required int32 accountAge = 12;\x0a  }\x0a\x0a  required USERINFO userInfo = 7;\x0a\x0a  message USERSTATS {\x0a    uint32 gamesPlayed = 1;\x0a    uint64 massConsumed = 2;\x0a    uint64 allTimeScore = 3;\x0a    uint32 highestMass = 4;\x0a    uint32 longestTimeAlive = 5;\x0a    uint32 mostCellsEaten = 6;\x0a  }\x0a\x0a  required USERSTATS userStats = 8;\x0a\x0a  message USERWALLET {\x0a    required int32 type = 1;\x0a    required string productId = 2;\x0a    required int32 amount = 3;\x0a  }\x0a\x0a  repeated USERWALLET userWallet = 9;\x0a  repeated Empty Settings = 10;\x0a  repeated Empty userBoosts = 11;\x0a  repeated Empty userTimedEvents = 12;\x0a\x0a  message USERGIFTS {\x0a    repeated Empty claimable = 0;\x0a    repeated Empty claimedFrom = 1;\x0a    repeated Empty sentTo = 2;\x0a    repeated Empty requestedTo = 3;\x0a    repeated string requestedFrom = 4;\x0a  }\x0a\x0a  required USERGIFTS userGifts = 13;\x0a\x0a  message SOFTUPGRADE {\x0a    required bool isAvailable = 1;\x0a    required bool rewardWasHandedOut = 2;\x0a  }\x0a\x0a  required SOFTUPGRADE softUpgrade = 14;\x0a  repeated Empty userAbTestGroups = 15;\x0a  repeated Empty userActiveQuests = 16;\x0a\x0a  message USERPOTIONS {\x0a    required int32 slot = 1;\x0a    required int32 status = 2;\x0a    required int32 secondsRemaining = 3;\x0a    required string productId = 4;\x0a  }\x0a\x0a  repeated USERPOTIONS userPotions = 17;\x0a  required string userSessionId = 18;\x0a\x0a  message USERSUBSCRIPTIONS {\x0a    repeated Empty active = 1;\x0a  }\x0a\x0a  required USERSUBSCRIPTIONS userSubscriptions = 20;\x0a\x0a  message USERREWARDS {\x0a    required int32 __for = 1;\x0a    required int32 activeSlot = 2;\x0a\x0a    message USERWALLETITEMS {\x0a      required int32 type = 1;\x0a      required string productId = 2;\x0a      required int32 amount = 3;\x0a    }\x0a\x0a    repeated USERWALLETITEMS userWalletItems = 3;\x0a  }\x0a\x0a  repeated USERREWARDS userRewards = 21;\x0a  repeated Empty userUnapprovedSkinsIds = 22;\x0a\x0a  message USERLEAGUESINFO {\x0a    required int32 secondsUntilReset = 1;\x0a  }\x0a\x0a  optional USERLEAGUESINFO userLeaguesInfo = 23;\x0a}\x0a\x0a\x0a';
        var proto = ('syntax="proto3";\nmessage Data {\n\tagario_proto_envelope_Content contentType = 1;\n\tuncompressedData uncompressedData = 2;\n\tbytes compressedData = 3;\n\tuint32 uncompressedSize = 4;\n}\n\n\n\nmessage uncompressedData {\n\t\tagario_proto_req_Type type = 1;\n\n\t\tagario_proto_Login_request loginRequestField = 10;\n\n\t\tagario_proto_Login_response loginResponseField = 11;\n\n\t\tagario_proto_Realm_upgrade_request realmUpgradeRequestField = 12;\n\n\t\tagario_proto_Realm_upgrade_response realmUpgradeResponseField = 13;\n\n\t\tagario_proto_Connect_request connectRequestField = 14;\n\n\t\tagario_proto_Connect_response connectResponseField = 15;\n\n\t\tagario_proto_Device_token_update deviceTokenUpdateField = 16;\n\n\t\tagario_proto_Disconnect disconnectField = 20;\n\n\t\tagario_proto_Reconnect reconnectField = 21;\n\n\t\tagario_proto_No_proper_response noProperResponseField = 22;\n\n\t\tagario_proto_Ping pingField = 30;\n\n\t\tagario_proto_Pong pongField = 31;\n\n\t\tagario_proto_Udp_handshake udpHandshakeField = 32;\n\n\t\tagario_proto_Configuration_change configurationChangeField = 33;\n\n\t\tagario_proto_Server_going_offline serverGoingOfflineField = 34;\n\n\t\tagario_proto_Game_enter_request gameEnterRequestField = 40;\n\n\t\tagario_proto_Game_enter_response gameEnterResponseField = 41;\n\n\t\tagario_proto_Game_joined gameJoinedField = 42;\n\n\t\tagario_proto_Game_lobby_enter_request gameLobbyEnterRequestField = 44;\n\n\t\tagario_proto_Game_lobby_enter_response gameLobbyEnterResponseField = 45;\n\n\t\tagario_proto_Game_lobby_queue_update gameLobbyQueueUpdateField = 47;\n\n\t\tagario_proto_Game_arena_direction_vector gameArenaDirectionVectorField = 50;\n\n\t\tagario_proto_Game_continue_update_request gameContinueUpdateRequestField = 54;\n\n\t\tagario_proto_Game_continue_update_response gameContinueUpdateResponseField = 55;\n\n\t\tagario_proto_Game_arena_leaderboard gameArenaLeaderboardField = 60;\n\n\t\tagario_proto_Game_arena_state gameArenaStateField = 61;\n\n\t\tagario_proto_Game_over gameOverField = 62;\n\n\t\tagario_proto_Game_arena_party_cell_updates gameArenaPartyCellUpdatesField = 63;\n\n\t\tagario_proto_Game_arena_party_leaderboard_entries_updates gameArenaPartyLeaderboardEntriesUpdatesField = 64;\n\n\t\tagario_proto_Game_arena_event gameArenaEventField = 65;\n\n\t\tagario_proto_Game_arena_current_safe_area gameArenaCurrentSafeAreaField = 66;\n\n\t\tagario_proto_Game_continue_info gameContinueInfoField = 67;\n\n\t\tagario_proto_Game_battle_royale_arena_phase gameBattleRoyaleArenaPhaseField = 68;\n\n\t\tagario_proto_Game_session_highest_mass gameSessionHighestMassField = 69;\n\n\t\tagario_proto_Soft_purchase_request softPurchaseRequestField = 70;\n\n\t\tagario_proto_Soft_purchase_response softPurchaseResponseField = 71;\n\n\t\tagario_proto_Apple_inapp_purchase_request appleInappPurchaseRequestField = 72;\n\n\t\tagario_proto_Google_inapp_purchase_request googleInappPurchaseRequestField = 73;\n\n\t\tagario_proto_Inapp_purchase_response inappPurchaseResponseField = 74;\n\n\t\tagario_proto_Wallet_updates walletUpdatesField = 75;\n\n\t\tagario_proto_Purchase_wallet_updates purchaseWalletUpdatesField = 76;\n\n\t\tagario_proto_Offer_bundle_request offerBundleRequestField = 77;\n\n\t\tagario_proto_Offer_bundle_response offerBundleResponseField = 78;\n\n\t\tagario_proto_Subscription_wallet_updates subscriptionWalletUpdatesField = 79;\n\n\t\tagario_proto_Update_user_settings_request updateUserSettingsRequestField = 80;\n\n\t\tagario_proto_Update_user_settings_response updateUserSettingsResponseField = 81;\n\n\t\tagario_proto_User_stats_request userStatsRequestField = 82;\n\n\t\tagario_proto_User_stats_response userStatsResponseField = 83;\n\n\t\tagario_proto_Server_to_server_game_over_wrapper serverToServerGameOverWrapperField = 90;\n\n\t\tagario_proto_Claim_gifts_request claimGiftsRequestField = 100;\n\n\t\tagario_proto_Claim_gifts_response claimGiftsResponseField = 101;\n\n\t\tagario_proto_Send_gifts sendGiftsField = 102;\n\n\t\tagario_proto_Consume_requests consumeRequestsField = 103;\n\n\t\tagario_proto_Request_gifts requestGiftsField = 104;\n\n\t\tagario_proto_Facebook_invitation_reward_updates facebookInvitationRewardUpdatesField = 105;\n\n\t\tagario_proto_Activate_timed_event_request activateTimedEventRequestField = 110;\n\n\t\tagario_proto_Activate_timed_event_response activateTimedEventResponseField = 111;\n\n\t\tagario_proto_Activate_boost_request activateBoostRequestField = 112;\n\n\t\tagario_proto_Activate_boost_response activateBoostResponseField = 113;\n\n\t\tagario_proto_Activate_quest_request activateQuestRequestField = 114;\n\n\t\tagario_proto_Activate_quest_response activateQuestResponseField = 115;\n\n\t\tagario_proto_User_timed_event_updates userTimedEventUpdatesField = 116;\n\n\t\tagario_proto_Activate_user_rewards_request activateUserRewardsRequestField = 117;\n\n\t\tagario_proto_Activate_user_rewards_response activateUserRewardsResponseField = 118;\n\n\t\tagario_proto_Open_potion_for_product_request openPotionForProductRequestField = 120;\n\n\t\tagario_proto_Open_potion_for_product_response openPotionForProductResponseField = 121;\n\n\t\tagario_proto_Brew_potion_for_slot_request brewPotionForSlotRequestField = 122;\n\n\t\tagario_proto_Brew_potion_for_slot_response brewPotionForSlotResponseField = 123;\n\n\t\tagario_proto_Open_potion_for_slot_request openPotionForSlotRequestField = 124;\n\n\t\tagario_proto_Open_potion_for_slot_response openPotionForSlotResponseField = 125;\n\n\t\tagario_proto_User_leagues_info_request userLeaguesInfoRequestField = 130;\n\n\t\tagario_proto_User_leagues_info_response userLeaguesInfoResponseField = 131;\n\n\t\tagario_proto_User_leagues_pass_update userLeaguesPassUpdateField = 132;\n\n\t\tagario_proto_User_party_create_response userPartyCreateResponseField = 141;\n\n\t\tagario_proto_User_party_join_request userPartyJoinRequestField = 142;\n\n\t\tagario_proto_User_party_join_response userPartyJoinResponseField = 143;\n\n\t\tagario_proto_User_party_membership_update userPartyMembershipUpdateField = 145;\n\n\t\tagario_proto_User_party_facebook_invite userPartyFacebookInviteField = 146;\n\n\t\tagario_proto_User_friend_list_update userFriendListUpdateField = 147;\n\n\t\tagario_proto_User_skins_create_request userSkinsCreateRequestField = 150;\n\n\t\tagario_proto_User_skins_create_response userSkinsCreateResponseField = 151;\n\n\t\tagario_proto_User_skins_delete userSkinsDeleteField = 152;\n\n\t\tagario_proto_Automation_request_update automationRequestUpdateField = 160;\n\n\t\tagario_proto_Action_counters_update actionCountersUpdateField = 170;\n\n\t\tagario_proto_User_ab_test_groups_update userAbTestGroupsUpdateField = 171;\n\n\t\tagario_proto_User_rewards_token_request userRewardsTokenRequestField = 180;\n\n\t\tagario_proto_User_rewards_token_response userRewardsTokenResponseField = 181;\n\n\t\tagario_proto_User_rewards_updates userRewardsUpdatesField = 182;\n\n\t\tagario_proto_Activate_reward_link_request activateRewardLinkRequestField = 183;\n\n\t\tagario_proto_Activate_reward_link_response activateRewardLinkResponseField = 184;\n\n\t\tagario_proto_Generic_video_ad_reward_token_request genericVideoAdRewardTokenRequestField = 185;\n\n\t\tagario_proto_Generic_video_ad_reward_token_response genericVideoAdRewardTokenResponseField = 186;\n}\nmessage agario_proto_Login_request {\n\tagario_proto_login_realm realm = 1;\n\tagario_proto_Device device = 2;\n\tagario_proto_Tokens tokens = 3;\n\tstring clientIp = 4;\n}\nmessage agario_proto_Device {\n\tagario_proto_device_Platform platform = 1;\n\tstring version = 2;\n\tuint32 width = 3;\n\tuint32 height = 4;\n}\n\nmessage agario_proto_Login_response {\n\tagario_proto_Tokens tokens = 1;\n\tagario_proto_login_response_Current_game_state currentGameState = 2;\n\toptional agario_proto_game_type currentGameType = 3;\n\toptional agario_proto_User_party userParty = 4;\n\tuint32 latestConfiguration = 5;\n\tagario_proto_Server_info serverInfo = 6;\n\tagario_proto_User_info userInfo = 7;\n\tagario_proto_User_stats userStats = 8;\n\trepeated agario_proto_User_wallet_item userWallet = 9;\n\trepeated agario_proto_User_setting userSettings = 10;\n\trepeated agario_proto_User_boost_item userBoosts = 11;\n\trepeated agario_proto_User_timed_event userTimedEvents = 12;\n\tagario_proto_User_gifts userGifts = 13;\n\tagario_proto_Soft_upgrade softUpgrade = 14;\n\trepeated agario_proto_User_ab_test_group userAbTestGroups = 15;\n\trepeated agario_proto_User_quest userActiveQuests = 16;\n\trepeated agario_proto_User_potion userPotions = 17;\n\tstring userSessionId = 18;\n\toptional agario_proto_User_leagues_info userLeaguesInfo = 19;\n\tagario_proto_User_subscriptions userSubscriptions = 20;\n\trepeated agario_proto_User_rewards userRewards = 21;\n\trepeated string userUnapprovedSkinsIds = 22;\n}\nmessage agario_proto_Realm_upgrade_request {\n\tagario_proto_upgrade_realm realm = 1;\n\tstring authToken = 2;\n}\nmessage agario_proto_Realm_upgrade_response {\n\tagario_proto_Realm_info realmInfo = 1;\n\tstring displayName = 2;\n\tbool rewardWasHandedOut = 3;\n\tagario_proto_User_wallet_item userWallet = 4;\n}\nmessage agario_proto_Connect_request {\n\tstring connectToken = 1;\n}\n\t\nmessage agario_proto_Connect_response {\n\tagario_proto_Server_info serverInfo = 1;\n}\n\t\nmessage agario_proto_Device_token_update {\n\tstring token = 1;\n}\n\t\nmessage agario_proto_Disconnect {\n\tagario_proto_disconnect_Reason reason = 1;\n}\n\t\nmessage agario_proto_Reconnect {\n\tstring host = 1;\n\tuint32 tcpPort = 2;\n\tagario_proto_reconnect_Reconnect_with reconnectWith = 3;\n\tstring connectToken = 4;\n}\n\t\nmessage agario_proto_No_proper_response {\n\tagario_proto_no_proper_response_For __for = 1;\n}\n\nmessage agario_proto_Ping {\n\tuint32 pingId = 1;\n\tuint32 previousRoundtrip = 2;\n}\n\nmessage agario_proto_Pong {\n\tuint32 pingId = 1;\n}\n\nmessage agario_proto_Udp_handshake {\n\tstring token = 1;\n}\n\nmessage agario_proto_Configuration_change {\n\tuint32 latest = 1;\n}\n\nmessage agario_proto_Server_going_offline {\n\tuint32 secondsRemaining = 1;\n}\n\nmessage agario_proto_Game_enter_request {\n\tstring nickname = 1;\n}\n\nmessage agario_proto_Game_enter_response {\n\tagario_proto_game_enter_response_Result result = 1;\n}\n\nmessage agario_proto_Game_joined {\n\tagario_proto_game_type gameType = 1;\n\tagario_proto_Game_arena_state gameArenaState = 2;\n\tfloat gameArenaSideLength = 3;\n\tuint32 secondsRemaining = 4;\n\tuint32 playersAlive = 5;\n\tbattleRoyaleArenaPhase battleRoyaleArenaPhase = 6;\n}\n\nmessage agario_proto_Game_lobby_enter_request {\n\tagario_proto_lobby_type lobbyType = 1;\n\tstring nickname = 2;\n}\n\nmessage agario_proto_Game_lobby_enter_response {\n\tagario_proto_game_lobby_enter_response_Result result = 1;\n}\n\nmessage agario_proto_Game_lobby_queue_update {\n\tagario_proto_lobby_type lobbyType = 1;\n\tuint32 playersWaitingToBeMatched = 2;\n\tuint32 matchingOccursInSeconds = 3;\n}\n \nmessage agario_proto_Game_arena_direction_vector {\n\tfloat x = 1;\n\tfloat y = 2;\n}\n\nmessage agario_proto_Game_continue_update_request {\n\tagario_proto_game_continue_update_request_Type type = 1;\n}\n\nmessage agario_proto_Game_continue_update_response {\n\trepeated agario_proto_Product_update productUpdates = 1;\n\tagario_proto_Game_over gameOver = 2;\n}\n\nmessage agario_proto_Game_arena_leaderboard {\n\trepeated agario_proto_Game_arena_leaderboard_entry leaderboardEntries = 1;\n\tuint32 playerPosition = 2;\n}\n\nmessage agario_proto_Game_arena_state {\n\tuint32 set_orderId = 1;\n\trepeated agario_proto_Game_arena_cell_state appeared = 2;\n\trepeated agario_proto_Game_arena_cell_state changed = 3;\n\trepeated uint32 disappeared = 4;\n\trepeated agario_proto_Game_arena_cell_death died = 5;\n\tbool isDead = 6;\n}\n\nmessage agario_proto_Game_over {\n\tagario_proto_game_type gameType = 1;\n\tagario_proto_game_over_reason reason = 2;\n\trepeated agario_proto_Product_update productUpdates = 3;\n\trepeated agario_proto_Xp_level_update xpLevelUpdates = 4;\n\tagario_proto_User_stats userStats = 5;\n\tagario_proto_Game_session_stats gameSessionStats = 6;\n\tagario_proto_Potion_info potionInfo = 7;\n\toptional agario_proto_Game_arena_leaderboard leaderboard = 8;\n}\n\nmessage agario_proto_Game_arena_party_cell_updates {\n\trepeated agario_proto_Game_arena_party_cell gameArenaPartyCells = 1;\n\tuint32 totalPartyMembersInArena = 2;\n}\n\nmessage agario_proto_Game_arena_party_leaderboard_entries_updates {\n\tagario_proto_Game_arena_leaderboard_entry gameArenaPartyLeaderboardEntries = 1;\n}\n\nmessage agario_proto_Game_arena_event {\n\tagario_proto_game_arena_event_Reason reason = 1;\n\tagario_proto_Game_arena_attacker gameArenaAttacker = 2;\n\tstring victimNickname = 3;\n\tuint32 playersAlive = 4;\n}\n\nmessage agario_proto_Game_arena_current_safe_area {\n\tagario_proto_Game_arena_safe_area area = 1;\n}\n\nmessage agario_proto_Game_continue_info {\n\tuint32 massUponContinue = 1;\n\tbool massIsKept = 2;\n\tstring gameContinueToken = 3;\n}\n\nmessage agario_proto_Game_battle_royale_arena_phase {\n\tagario_proto_game_battle_royale_arena_phase_Phase_id phaseId = 1;\n\tuint32 timeToNext = 2;\n\tagario_proto_Game_arena_safe_area currentSafeArea = 3;\n\tagario_proto_Game_arena_safe_area nextSafeArea = 4;\n}\n\nmessage agario_proto_Game_session_highest_mass {\n\tuint32 highestMass = 1;\n}\n\nmessage agario_proto_Soft_purchase_request {\n\t\tstring purchaseId = 1;\n}\n\nmessage agario_proto_Soft_purchase_response {\n\t\tagario_proto_soft_purchase_response_Result result = 1;\n\t\tstring purchaseId = 2;\n\t\trepeated agario_proto_Product_update productUpdates = 3;\n}\n\nmessage agario_proto_Apple_inapp_purchase_request {\n\t\tuint64 transactionId = 1;\n\t\tstring receiptData = 2;\n\t\tstring purchaseToken = 3;\n}\n\nmessage agario_proto_Google_inapp_purchase_request {\n\t\tuint64 transactionId = 1;\n\t\tstring receiptData = 2;\n\t\tstring signature = 3;\n}\n\nmessage agario_proto_Inapp_purchase_response {\n\t\tagario_proto_inapp_purchase_response_Result result = 1;\n\t\tuint64 transactionId = 2;\n\t\trepeated agario_proto_Product_update productUpdates = 3;\n}\n\nmessage agario_proto_Wallet_updates {\n\t\tstring originPlatform = 1;\n\t\trepeated agario_proto_Product_update productUpdates = 2;\n}\n\nmessage agario_proto_Purchase_wallet_updates {\n\t\tstring purchaseId = 1;\n\t\tagario_proto_Wallet_updates walletUpdates = 2;\n}\n\nmessage agario_proto_Offer_bundle_request {\n\tstring bundleId = 1;\n}\n\nmessage agario_proto_Offer_bundle_response {\n\tagario_proto_offer_bundle_response_Result result = 1;\n\tstring bundleId = 2;\n\trepeated agario_proto_Product_update productUpdates = 3;\n}\n\nmessage agario_proto_Subscription_wallet_updates {\n\t\tagario_proto_subscription_type subscriptionType = 1;\n\t\trepeated agario_proto_Product_update productUpdates = 2;\n}\n\nmessage agario_proto_Update_user_settings_request {\n\t\trepeated agario_proto_User_setting userSettingsUpdates = 1;\n}\n\nmessage agario_proto_Update_user_settings_response {\n\t\trepeated agario_proto_User_setting updatedUserSettings = 1;\n}\nmessage agario_proto_User_stats_request {\n\t\tstring userId = 1;\n}\n\nmessage agario_proto_User_stats_response {\n\t\tstring userId = 1;\n\t\tagario_proto_User_stats userStats = 2;\n\t\tuint32 lifetimeTrophies = 3;\n\t\tuint32 level = 4;\n}\n\nmessage agario_proto_Server_to_server_game_over_wrapper {\n\tstring hashVerifier = 1;\n\tbytes serverToServerGameOver = 2;\n}\n\nmessage agario_proto_Claim_gifts_request {\n\t\trepeated string giftIds = 1;\n}\n\nmessage agario_proto_Claim_gifts_response {\n\t repeated agario_proto_Product_update productUpdates = 1;\n}\n\nmessage agario_proto_Send_gifts {\n\t repeated string giftIds = 1;\n}\n\nmessage agario_proto_Consume_requests {\n\t repeated string requestIds = 1;\n}\n\nmessage agario_proto_Request_gifts {\n\t repeated string giftIds = 1;\n}\n\nmessage agario_proto_Facebook_invitation_reward_updates {\n\t repeated string facebookIdsFrom = 1;\n\t repeated agario_proto_Product_update productUpdates = 2;\n}\n\nmessage agario_proto_Activate_timed_event_request {\n\t\tstring eventId = 1;\n}\n\nmessage agario_proto_Activate_timed_event_response {\n\tagario_proto_User_timed_event userTimedEvent = 1;\n\trepeated agario_proto_Product_update productUpdates = 2;\n}\n\nmessage agario_proto_Activate_boost_request {\n\t\tstring productId = 1;\n}\n\nmessage agario_proto_Activate_boost_response {\n\tagario_proto_User_boost_item userBoostItem = 1;\n\trepeated agario_proto_Product_update productUpdates = 2;\n}\n\nmessage agario_proto_Activate_quest_request {\n\t\tstring productId = 1;\n}\n\nmessage agario_proto_Activate_quest_response {\n\tagario_proto_User_quest userQuest = 1;\n\trepeated agario_proto_Product_update productUpdates = 2;\n}\n\nmessage agario_proto_User_timed_event_updates {\n\t\trepeated agario_proto_User_timed_event userTimedEvents = 1;\n}\n\nmessage agario_proto_Activate_user_rewards_request {\n\tagario_proto_rewards_for __for = 1;\n}\n\nmessage agario_proto_Activate_user_rewards_response {\n\tagario_proto_User_rewards userRewards = 1;\n\trepeated agario_proto_Product_update productUpdates = 2;\n}\n\nmessage agario_proto_Open_potion_for_product_request {\n\t\tstring productId = 1;\n}\n\nmessage agario_proto_Open_potion_for_product_response {\n\t\tagario_proto_open_potion_for_product_response_Result result = 1;\n\t\tstring productId = 2;\n\t\trepeated agario_proto_Product_update productUpdates = 3;\n}\n\nmessage agario_proto_Brew_potion_for_slot_request {\n\tagario_proto_user_potion_slot slot = 1;\n}\n\nmessage agario_proto_Brew_potion_for_slot_response {\n\t\tagario_proto_brew_potion_for_slot_response_Result result = 1;\n\t\trepeated agario_proto_User_potion userPotions = 2;\n}\n\nmessage agario_proto_Open_potion_for_slot_request {\n\tagario_proto_user_potion_slot slot = 1;\n}\n\nmessage agario_proto_Open_potion_for_slot_response {\n\t\tagario_proto_open_potion_for_slot_response_Result result = 1;\n\t\trepeated agario_proto_Product_update productUpdates = 2;\n\t\trepeated agario_proto_User_potion userPotions = 3;\n}\n\nmessage agario_proto_User_leagues_info_request {\n\tagario_proto_league_request_type leagueRequestType = 1;\n}\n\nmessage agario_proto_User_leagues_info_response {\n\tagario_proto_league_request_type leagueRequestType = 1;\n\trepeated agario_proto_User_leagues_player_info league = 2;\n\trepeated agario_proto_User_leagues_player_info country = 3;\n\trepeated agario_proto_User_leagues_player_info world = 4;\n\trepeated agario_proto_User_leagues_player_info friends = 5;\n\tagario_proto_User_leagues_info userLeaguesInfo = 6;\n\trepeated agario_proto_Product_update productUpdates = 7;\n}\n\nmessage agario_proto_User_leagues_pass_update {\n\tagario_proto_league_type leagueType = 1;\n\tagario_proto_User_leagues_player_info playerThatPassed = 2;\n\tagario_proto_User_leagues_player_info playerThatWasPassed = 3;\n}\n\nmessage agario_proto_User_party_create_response {\n\tagario_proto_User_party userParty = 1;\n}\n\nmessage agario_proto_User_party_join_request {\n\tstring code = 1;\n}\n\nmessage agario_proto_User_party_join_response {\n\tagario_proto_user_party_join_response_Result result = 1;\n\tagario_proto_User_party userParty = 2;\n}\n\nmessage agario_proto_User_party_membership_update {\n\tagario_proto_user_party_membership_update_Update_type updateType = 1;\n\tagario_proto_User_party_member member = 2;\n\tstring code = 3;\n}\n\nmessage agario_proto_User_party_facebook_invite {\n\trepeated string facebookIds = 1;\n}\n\nmessage agario_proto_User_friend_list_update {\n\trepeated agario_proto_User_friend userFriends = 1;\n\tuint32 totalOnlineFriends = 2;\n}\n\nmessage agario_proto_User_skins_create_request {\n\t\tstring content = 1;\n\t\tstring meta = 2;\n}\n\nmessage agario_proto_User_skins_create_response {\n\tagario_proto_user_skins_create_response_Result result = 1;\n\trepeated agario_proto_Product_update productUpdates = 2;\n}\n\nmessage agario_proto_User_skins_delete {\n\tstring skinId = 1;\n}\n\nmessage agario_proto_Automation_request_update {\n\tstring eventFinished = 1;\n}\n\nmessage agario_proto_Action_counters_update {\n\tuint32 questsCompleted = 1;\n\tuint32 potionsObtained = 2;\n\tuint32 skinsCreated = 3;\n}\n\nmessage agario_proto_User_ab_test_groups_update {\n\trepeated agario_proto_User_ab_test_group userAbTestGroups = 1;\n}\n\nmessage agario_proto_User_rewards_token_request {\n\tagario_proto_rewards_for __for = 1;\n}\n\nmessage agario_proto_User_rewards_token_response {\n\tagario_proto_rewards_for __for = 1;\n\tstring token = 2;\n}\n\nmessage agario_proto_User_rewards_updates {\n\tagario_proto_rewards_for __for = 1;\n\tuint32 activeSlot = 2;\n\trepeated agario_proto_Product_update productUpdates = 3;\n}\n\nmessage agario_proto_Activate_reward_link_request {\n\tstring token = 1;\n}\n\nmessage agario_proto_Activate_reward_link_response {\n\tagario_proto_activate_reward_link_response_Result result = 1;\n\trepeated agario_proto_Product_update productUpdates = 2;\n}\n\nmessage agario_proto_Generic_video_ad_reward_token_request {\n///empty?\n}\n\nmessage agario_proto_Generic_video_ad_reward_token_response {\n\tstring token = 1;\n}\n\n\n\nmessage agario_proto_Tokens {\n\tstring auth = 1;\n\tstring alt = 2;\n\tstring gdpr = 3;\n\tstring xsolla = 4;\n}\nmessage agario_proto_User_party {\n\tstring code = 1;\n\tuint32 endsInSeconds = 2;\n\trepeated agario_proto_User_party_member members = 3;\n}\nmessage agario_proto_User_party_member {\n\tstring displayName = 1;\n\tagario_proto_Realm_info realmInfo = 2;\n\toptional string userId = 3;\n}\nmessage agario_proto_Realm_info {\n\tagario_proto_login_realm realm = 1;\n\tstring realmId = 2;\n\tstring avatarUrl = 3;\n}\nmessage agario_proto_Server_info {\n\tstring host = 1;\n\tuint32 tcpPort = 2;\n\tuint32 udpPort = 3;\n\tstring awsRegion = 4;\n}\nmessage agario_proto_User_info {\n\tstring userId = 1;\n\tstring displayName = 2;\n\tuint32 xp = 3;\n\tuint32 level = 4;\n\tbool isPayingUser = 5;\n\tbool hasLoggedIntoMobile = 6;\n\tbool isNewUser = 7;\n\tagario_proto_Realm_info realmInfo = 8;\n\tuint32 extraInitialMass = 9;\n\tagario_proto_Action_counters_update actionCounters = 10;\n\tstring latestCountryCode = 11;\n\tuint32 accountAge = 12;\n}\nmessage agario_proto_User_setting {\n\tagario_proto_user_setting_Type type = 1;\n\tagario_proto_user_setting_Key key = 2;\n\tstring valueString = 3;\n\tint32 valueInt32 = 4;//not enum\n}\nmessage agario_proto_Product_update {\n\tagario_proto_product_update_Origin origin = 1;\n\tagario_proto_User_wallet_item userWalletItem = 2;\n\tint32 deltaAmount = 3;//not enum\n}\nmessage agario_proto_Potion_info {\n\tagario_proto_User_potion newUserPotion = 1;\n\tbool wouldHaveWonPotion = 2;\n}\nmessage agario_proto_User_timed_event {\n\tstring eventId = 1;\n\tuint32 nextAvailableInSeconds = 2;\n}\nmessage agario_proto_User_boost_item {\n\tstring productId = 1;\n\tuint32 expiresInSeconds = 2;\n}\nmessage agario_proto_User_quest {\n\tagario_proto_game_type gameType = 1;\n\tstring productId = 2;\n\tstring type = 3;\n\tuint32 goal = 4;\n\tuint32 expiresInSeconds = 5;\n}\nmessage agario_proto_Xp_level_update {\n\tuint32 finalXpForLevel = 1;\n\tuint32 deltaXp = 2;\n\tuint32 finalLevel = 3;\n\tuint32 deltaLevel = 4;\n}\nmessage agario_proto_Game_session_stats {\n\tuint32 massConsumed = 1;\n\tuint32 timeTotal = 2;\n\tuint32 timeInLeaderboard = 3;\n\tuint32 topPosition = 4;\n\tuint32 finalPosition = 5;\n\tuint32 longestTimeAlive = 6;\n\tuint32 finalMass = 7;\n\tuint32 highestMass = 8;\n\tuint32 normalCellsEaten = 9;\n\tuint32 foodEaten = 10;\n\tuint32 virusesEaten = 11;\n\tuint32 playersEaten = 12;\n}\nmessage agario_proto_User_stats {\n\tuint32 gamesPlayed = 1;\n\tuint64 massConsumed = 2;\n\tuint64 allTimeScore = 3;\n\tuint32 highestMass = 4;\n\tuint32 longestTimeAlive = 5;\n\tuint32 mostCellsEaten = 6;\n}\nmessage agario_proto_User_wallet_item {\n\tagario_proto_user_wallet_item_Type type = 1;\n\tstring productId = 2;\n\tuint32 amount = 3;\n}\nmessage agario_proto_User_gifts {\n\trepeated agario_proto_User_gift claimable = 1;\n\trepeated string claimedFrom = 2;\n\trepeated string sentTo = 3;\n\trepeated string requestedTo = 4;\n\trepeated string requestedFrom = 5;\n}\nmessage agario_proto_User_gift {\n\tstring facebookIdFrom = 1;\n\tagario_proto_User_wallet_item userWalletItem = 2;\n}\nmessage agario_proto_Soft_upgrade {\n\tbool isAvailable = 1;\n\tbool rewardWasHandedOut = 2;\n}\nmessage agario_proto_User_ab_test_group {\n\tstring testId = 1;\n\tstring testGroup = 2;\n}\nmessage agario_proto_User_potion {\n\tagario_proto_user_potion_slot slot = 1;\n\tagario_proto_user_potion_Status status = 2;\n\tuint32 secondsRemaining = 3;\n\tstring productId = 4;\n}\nmessage agario_proto_User_subscriptions {\n\trepeated int32 active = 1;\n}\nmessage agario_proto_User_rewards {\n\tagario_proto_rewards_for __for = 1;\n\tuint32 activeSlot = 2;\n\trepeated agario_proto_User_wallet_item userWalletItems = 3;\n}\nmessage agario_proto_User_friend {\n\tagario_proto_user_friend_Status status = 1;\n\tstring userId = 2;\n\tagario_proto_Realm_info realmInfo = 3;\n}\nmessage agario_proto_User_leagues_player_info {\n\tstring userId = 1;\n\tstring displayName = 2;\n\tstring leagueName = 3;\n\tstring countryCode = 4;\n\tuint32 rank = 5;\n\tuint32 lvl = 6;\n\tuint32 trophies = 7;\n\tagario_proto_Realm_info realmInfo = 8;\n}\nmessage agario_proto_User_leagues_info {\n\tuint32 secondsUntilReset = 1;\n}\nmessage agario_proto_Game_arena_safe_area {\n\tcenter center = 1;\n\tfloat radius = 2;\n}\nmessage agario_proto_Game_arena_cell_state {\n\tagario_proto_game_arena_cell_state_Cell_type type = 1;\n\tuint32 cellId = 2;\n\tagario_proto_Game_arena_point coordinate = 3;\n\tfloat radius = 4;\n\tstring nickname = 5;\n\tuint32 userLevel = 6;\n\tuint32 skinGameplayId = 7;\n\tstring skinId = 8;\n\tbool playerOwned = 9;\n\tuint32 ownerId = 10;\n}\nmessage agario_proto_Game_arena_point {\n\tfloat x = 1;\n\tfloat y = 2;\n}\nmessage agario_proto_Game_arena_attacker {\n\tstring nickname = 1;\n\tbool itsMe = 2;\n}\nmessage agario_proto_Game_arena_leaderboard_entry {\n\tuint32 ownerId = 1;\n\tuint32 playerPosition = 2;\n\tstring nickname = 3;\n}\nmessage agario_proto_Game_arena_party_cell {\n\tuint32 ownerId = 1;\n\tagario_proto_Game_arena_point coordinate = 2;\n\tstring nickname = 3;\n\tagario_proto_User_party_member userPartyMember = 4;\n}\nmessage agario_proto_Game_arena_cell_death {\n\tuint32 victimId = 1;\n\tuint32 attackerId = 2;\n}\nenum agario_proto_activate_reward_link_response_Result {\n\tsuccess = 1;\n\treward_link_already_claimed = 2;\n\treward_link_expired = 3;\n\treward_link_not_found = 4;\n\treward_link_generic_error = 5;\n}\nenum agario_proto_brew_potion_for_slot_response_Result {\n\tsuccess = 1;\n\tpotion_not_collected = 2;\n\tpotion_being_brewed = 3;\n}\nenum agario_proto_device_Platform {\n\tios = 1;\n\tandroid = 2;\n\tweb_facebook = 3;\n\tweb_miniclip = 4;\n\tweb_agario = 5;\n}\nenum agario_proto_disconnect_Reason {\n\tincompatible_client = 1;\n\tpacket_not_authorized = 2;\n\tlogin_elsewhere = 3;\n\tserver_offline = 4;\n\tuser_banned = 5;\n\tping_error = 6;\n\tunknown_game_type = 7;\n\ttoo_many_operations = 8;\n\tunreachable_realm = 9;\n\tuser_deleted = 10;\n\tnot_authorized_by_realm = 11;\n\tbad_request = 12;\n\treset_by_peer = 13;\n\tinvalid_token = 14;\n\texpired_token = 15;\n\tstate_transfer_error = 16;\n}\nenum agario_proto_envelope_Content {\n\tuncompressed = 1;\n\tcompressed = 2;\n}\nenum agario_proto_game_arena_cell_state_Cell_type {\n\tnormal_cell = 1;\n\tvirus = 2;\n\tfood = 3;\n\tpush_virus = 4;\n\tspawn_virus = 5;\n}\nenum agario_proto_game_arena_event_Reason {\n\teaten_by_player = 1;\n\teaten_by_virus = 2;\n\tkilled_by_arena = 3;\n\tleft_arena = 4;\n}\nenum agario_proto_game_battle_royale_arena_phase_Phase_id {\n\twaiting = 1;\n\tstarting = 2;\n\tinitial = 3;\n\tcountdown = 4;\n\tshrink = 5;\n}\nenum agario_proto_game_continue_update_request_Type {\n\tdo_continue = 1;\n\tdo_cancel = 2;\n}\nenum agario_proto_game_enter_response_Result {\n\tsuccess = 1;\n\tuser_party_full = 2;\n}\nenum agario_proto_game_lobby_enter_response_Result {\n\tsuccess = 1;\n\tinsufficient_level = 2;\n}\nenum agario_proto_game_over_reason {\n\tdisconnected_by_inactivity = 1;\n\tleft = 2;\n\teaten = 3;\n\tgame_ended = 4;\n\tserver_going_offline = 5;\n\tarena_is_offline = 6;\n}\nenum agario_proto_game_type {\n\tfree_for_all = 1;\n\trush_mode = 2;\n\tparty = 3;\n\texperimental = 4;\n\tteams = 5;\n\tbattle_royale = 6;\n}\nenum agario_proto_inapp_purchase_response_Result {\n\tnormal_success = 1;\n\tsubscription_purchased = 2;\n\tsubscription_renewed = 3;\n\tsubscription_expired = 4;\n\ttry_again_later = 5;\n\tinvalid_receipt = 6;\n\tunknown_purchase_id = 7;\n}\nenum agario_proto_league_request_type {\n\tcurrent = 1;\n\tprevious = 2;\n}\nenum agario_proto_league_type {\n\tleague = 1;\n\tcountry = 2;\n\tworld = 3;\n\tfriends = 4;\n}\nenum agario_proto_lobby_type {\n\trush_mode = 1;\n\tbattle_royale = 2;\n}\nenum agario_proto_login_realm {\n\tguest = 1;\n\tfacebook = 2;\n\tgoogleplus = 3;\n\tgoogleplay = 4;\n}\nenum agario_proto_login_response_Current_game_state {\n\tnot_playing = 1;\n\tplaying = 2;\n}\nenum agario_proto_no_proper_response_For {\n\tuser_leagues_info_request = 1;\n\tuser_party_create_request = 2;\n\tuser_party_join_request = 3;\n}\nenum agario_proto_offer_bundle_response_Result {\n\tsuccess = 1;\n\toffer_not_active = 2;\n\tpreconditions_failed = 3;\n}\nenum agario_proto_open_potion_for_product_response_Result {\n\tsuccess = 1;\n\tinsufficient_funds = 2;\n}\nenum agario_proto_open_potion_for_slot_response_Result {\n\tsuccess = 1;\n\tpotion_not_ready = 2;\n}\nenum agario_proto_product_update_Origin {\n\txp_level_up = 1;\n\tsoft_purchase = 2;\n\tinapp_purchase = 3;\n\txp_boost_activation = 4;\n\tmass_boost_activation = 5;\n\thourly_bonus = 6;\n\treward_platform = 7;\n\tpayment_platform = 8;\n\tgifting = 9;\n\trush_mass_boost_activation = 10;\n\tquest_activation = 11;\n\tquest_reward = 12;\n\tsoft_purchase_refund = 13;\n\tpotion_opened = 14;\n\tpotion_obtained = 15;\n\tbundle_offer = 16;\n\tleague_reward_for_league = 17;\n\tleague_reward_for_country = 18;\n\tleague_reward_for_world = 19;\n\tleague_reward_for_friends = 20;\n\tfacebook_invitation = 21;\n\tskins_create = 22;\n\tskins_delete = 23;\n\tvip_weekly = 24;\n\tgame_continued = 25;\n\tslots_full_on_battle = 26;\n\tprogressive_video_reward = 27;\n\treward_link = 28;\n}\nenum agario_proto_reconnect_Reconnect_with {\n\tlogin_request = 1;\n\tconnect_request = 2;\n}\nenum agario_proto_req_Type {\n\tlogin_request = 10;\n\t\tlogin_response = 11;\n\t\trealm_upgrade_request = 12;\n\t\trealm_upgrade_response = 13;\n\t\tconnect_request = 14;\n\t\tconnect_response = 15;\n\t\tdevice_token_update = 16;\n\t\tdisconnect = 20;\n\t\treconnect = 21;\n\t\tno_proper_response = 22;\n\t\tping = 30;\n\t\tpong = 31;\n\t\tudp_handshake = 32;\n\t\tconfiguration_change = 33;\n\t\tserver_going_offline = 34;\n\t\tgame_enter_request = 40;\n\t\tgame_enter_response = 41;\n\t\tgame_joined = 42;\n\t\tgame_leave = 43;\n\t\tgame_lobby_enter_request = 44;\n\t\tgame_lobby_enter_response = 45;\n\t\tgame_lobby_leave = 46;\n\t\tgame_lobby_queue_update = 47;\n\t\tgame_arena_direction_vector = 50;\n\t\tgame_arena_player_split = 51;\n\t\tgame_arena_player_shoot_mass = 52;\n\t\tgame_arena_player_respawn = 53;\n\t\tgame_continue_update_request = 54;\n\t\tgame_continue_update_response = 55;\n\t\tgame_arena_leaderboard = 60;\n\t\tgame_arena_state = 61;\n\t\tgame_over = 62;\n\t\tgame_arena_party_cell_updates = 63;\n\t\tgame_arena_party_leaderboard_entries_updates = 64;\n\t\tgame_arena_event = 65;\n\t\tgame_arena_current_safe_area = 66;\n\t\tgame_continue_info = 67;\n\t\tgame_battle_royale_arena_phase = 68;\n\t\tgame_session_highest_mass = 69;\n\t\tsoft_purchase_request = 70;\n\t\tsoft_purchase_response = 71;\n\t\tapple_inapp_purchase_request = 72;\n\t\tgoogle_inapp_purchase_request = 73;\n\t\tinapp_purchase_response = 74;\n\t\twallet_updates = 75;\n\t\tpurchase_wallet_updates = 76;\n\t\toffer_bundle_request = 77;\n\t\toffer_bundle_response = 78;\n\t\tsubscription_wallet_updates = 79;\n\t\tupdate_user_settings_request = 80;\n\t\tupdate_user_settings_response = 81;\n\t\tuser_stats_request = 82;\n\t\tuser_stats_response = 83;\n\t\tserver_to_server_game_over_wrapper = 90;\n\t\tclaim_gifts_request = 100;\n\t\tclaim_gifts_response = 101;\n\t\tsend_gifts = 102;\n\t\tconsume_requests = 103;\n\t\trequest_gifts = 104;\n\t\tfacebook_invitation_reward_updates = 105;\n\t\tactivate_timed_event_request = 110;\n\t\tactivate_timed_event_response = 111;\n\t\tactivate_boost_request = 112;\n\t\tactivate_boost_response = 113;\n\t\tactivate_quest_request = 114;\n\t\tactivate_quest_response = 115;\n\t\tuser_timed_event_updates = 116;\n\t\tactivate_user_rewards_request = 117;\n\t\tactivate_user_rewards_response = 118;\n\t\topen_potion_for_product_request = 120;\n\t\topen_potion_for_product_response = 121;\n\t\tbrew_potion_for_slot_request = 122;\n\t\tbrew_potion_for_slot_response = 123;\n\t\topen_potion_for_slot_request = 124;\n\t\topen_potion_for_slot_response = 125;\n\t\tuser_leagues_info_request = 130;\n\t\tuser_leagues_info_response = 131;\n\t\tuser_leagues_pass_update = 132;\n\t\tuser_party_create_request = 140;\n\t\tuser_party_create_response = 141;\n\t\tuser_party_join_request = 142;\n\t\tuser_party_join_response = 143;\n\t\tuser_party_leave = 144;\n\t\tuser_party_membership_update = 145;\n\t\tuser_party_facebook_invite = 146;\n\t\tuser_friend_list_update = 147;\n\t\tuser_skins_create_request = 150;\n\t\tuser_skins_create_response = 151;\n\t\tuser_skins_delete = 152;\n\t\tautomation_request_update = 160;\n\t\taction_counters_update = 170;\n\t\tuser_ab_test_groups_update = 171;\n\t\tuser_rewards_token_request = 180;\n\t\tuser_rewards_token_response = 181;\n\t\tuser_rewards_updates = 182;\n\t\tactivate_reward_link_request = 183;\n\t\tactivate_reward_link_response = 184;\n\t\tgeneric_video_ad_reward_token_request = 185;\n\t\tgeneric_video_ad_reward_token_response = 186;\n}\nenum agario_proto_rewards_for {\n\tprogressive_video = 1;\n}\nenum agario_proto_soft_purchase_response_Result {\n\tsuccess = 1;\n\tinsufficient_funds = 2;\n\tpreconditions_failed = 3;\n}\nenum agario_proto_subscription_type {\n\tvip_weekly = 1;\n}\nenum agario_proto_upgrade_realm {\n\tfacebook = 1;\n\tgoogleplus = 2;\n\tgoogleplay = 3;\n}\nenum agario_proto_user_friend_Status {\n\tonline = 1;\n\toffline = 2;\n}\nenum agario_proto_user_party_join_response_Result {\n\tsuccess = 1;\n\texpired = 2;\n\tinvalid = 3;\n\tfull = 4;\n\tincompatible = 5;\n}\nenum agario_proto_user_party_membership_update_Update_type {\n\tjoined = 1;\n\tleft = 2;\n\tinvited_you = 3;\n}\nenum agario_proto_user_potion_Status {\n\tcollected = 1;\n\tbrewing = 2;\n\tready = 3;\n}\nenum agario_proto_user_potion_slot {\n\tslot_1 = 1;\n\tslot_2 = 2;\n\tslot_3 = 3;\n}\nenum agario_proto_user_setting_Key {\n\tselected_skin_id = 1;\n\tstop_on_release = 2;\n\tdirection_on_touch = 3;\n\tbutton_positions = 4;\n\tshow_mass = 5;\n\tshow_arrow = 6;\n\tdark_background = 7;\n\tshow_level = 8;\n\tlocalization_language = 9;\n\tsounds_on_arena = 10;\n\tsounds_on_menu = 11;\n\tingame_quest_progress = 12;\n\tshow_online_status_to_friends = 13;\n}\nenum agario_proto_user_setting_Type {\n\tis_string = 1;\n\tis_int32 = 2;\n}\nenum agario_proto_user_skins_create_response_Result {\n\tsuccess = 1;\n\tinsufficient_funds = 2;\n\ttransient_error = 3;\n}\nenum agario_proto_user_wallet_item_Type {\n\tcurrency = 1;\n\tboost = 2;\n\tskin = 3;\n\tquest = 4;\n\trush_boost = 5;\n\tpotion = 6;\n\ttrophy = 7;\n\tskin_piece = 8;\n\tpotion_skip_brew_token = 9;\n\tskin_create_token = 10;\n\tskin_custom = 11;\n\tgame_continue_token = 12;\n\tignore = 13;\n\tprogressive_video_reward_token = 14;\n}\n'); 

try {
    var root = protobuf.parse(proto).root,
        mobileData = root.lookupType('index');
} catch (a4c) {}
class Client {
    constructor(a, b) {
        eventify(this);
        this.type = a;
        this.tabName = b;
        this.isDebug = true;
        Debugger(true, this, '[[35mClient ' + b + '[105m]:');
        this._mouseClientX = 0;
        this._mouseClientY = 0;
        this._scale = 1;
        this._camX = 0;
        this._camY = 0;
        this.integrity = true;
        this.client_protocol = 23;
        this.client_version_string = '3.11.2';
        this.client_version = 31109;
        this.gotCaptcha = false;
        this.quadrant = null;
        this.realQuadrant = null;
        this.lastRealQuadrant = null;
        this.lastQuadrant = null;
        this.mirrorV = false;
        this.mirrorH = false;
        this.ghostCellsStep = 0;
        this.connectionTime = 0;
        this.totalPackets = 0;
        this.isFreeSpectate = false;
        this.isSpectateEnabled = false;
        this.ppsLastRequest = null;
        this.pps = 0;
        this.ws = null;
        this.gameMode = null;
        this.modeInt = 3;
        this.lastws = null;
        this.socket = null;
        this.shutup = false;
        this.protocolKey = null;
        this.clientKey = null;
        this.estabilished = false;
        this.connectionOpened = false;
        this.accessTokenSent = false;
        this.loggedIn = false;
        this.time = Date.now();
        this.serverTime = 0;
        this.serverTimeDiff = 0;
        this.loggedInTime = 0;
        this.mapSize = AGAR_CONST.MAP_EDGE_LENGTH;
        this.mapOffset = AGAR_CONST.MAP_EDGE_LENGTH / 2;
        this.mapOffsetX = 0;
        this.mapOffsetY = 0;
        this.mapShiftX = 0;
        this.mapShiftY = 0;
        this.mapOffsetFixed = false;
        this.mapMinX = -AGAR_CONST.MAP_EDGE_LENGTH / 2;
        this.mapMinY = -AGAR_CONST.MAP_EDGE_LENGTH / 2;
        this.mapMaxX = AGAR_CONST.MAP_EDGE_LENGTH / 2;
        this.mapMaxY = AGAR_CONST.MAP_EDGE_LENGTH / 2;
        this.mapShrinkW = 1;
        this.mapShrinkH = 1;
        this.mapMidX = 0;
        this.mapMidY = 0;
        this.viewMinX = 0;
        this.viewMinY = 0;
        this.viewMaxX = 0;
        this.viewMaxY = 0;
        this.camMaxX = 0;
        this.camMaxY = 0;
        this.camMinX = 0;
        this.camMinY = 0;
        this.staticX = 0;
        this.staticY = 0;

        this.bound = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };

        this.viewportW2s = 0;
        this.viewportH2s = 0;

        this.viewport = [
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0]
            ]
        ];

        this.availableViewport = [
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0]
            ]
        ];

        this.unavailableViewport = [
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0]
            ]
        ];

        this.$cells = new Map();
        this.$playerCells = new Map();
        this.$cellsID = new Set();

        this.cellRange = {
            max: 0,
            min: 0
        };

        this.cellShift = 0;
        this.cellAID = {};
        this.indexedCells = {};
        this.cells = [];
        this.removedCells = [];
        this.food = [];
        this.viruses = [];
        this.playerCells = [];
        this.playerCellIDs = [];
        this.ghostCells = [];
        this.playerX = 0;
        this.playerY = 0;
        this.playerSize = 0;
        this.playerMass = 0;
        this.playerMaxMass = 0;
        this.playerMinMass = 0;
        this.playerScore = 0;
        this.playerSplitCells = 0;
        this.playerAID = 0;
        this.playerColor = null;
        this.playerNick = '';
        this.playerPosition = 0;
        this.leaderboard = [];
        this.biggerSTEDCellsCache = [];
        this.biggerSTECellsCache = [];
        this.biggerCellsCache = [];
        this.smallerCellsCache = [];
        this.STECellsCache = [];
        this.STE = 0;
        this.autoZoom = false;
        this.viewX = 0;
        this.viewY = 0;
        this.protocol_viewX = 0;
        this.protocol_viewY = 0;
        this.lviewX = 0;
        this.lviewY = 0;
        this.scale = 1;
        this.cursorX = 0;
        this.cursorY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.targetDistance = 0;

        this.battleRoyale = {
            state: 0,
            players: 0,
            startTime: 0,
            shrinkTime: 0,
            timeLeft: 0,
            x: 0,
            y: 0,
            radius: 0,
            targetX: 0,
            targetY: 0,
            targetRadius: 0,
            maxRadius: 11313,
            rank: [],
            playerRank: 0,
            joined: false
        };

        this.sendPositionInterval = null;
        this.play = false;
        this.pause = false;
        this.targeting = false;
        this.removePlayerCell = false;
        this.showFood = true;
        this.foodIsHidden = false;
        this.selectBiggestCell = true;
        this.hideSmallBots = false;
        this.pressedKeys = {};
    }
    get index() {
        return application.tabs.indexOf(this);
    }
    getPlayerX() {
        return this.playerX + this.mapOffsetX;
    }
    getPlayerY() {
        return this.playerY + this.mapOffsetY;
    }
    connect(a) {
        console.log('Connecting to game socket:', a);
        const b = this;
        clearInterval(this.sendPositionInterval);
        this.closeConnection(true);
        this.ws = a;
        this.flushCellsData();
        this.lastws = a;
        this.gotCaptcha = false;
        this.protocolKey = null;
        this.clientKey = null;
        this.estabilished = false;
        this.accessTokenSent = false;
        this.connectionOpened = false;
        this.loggedIn = false;
        this.mapOffsetFixed = false;
        this.mapShiftX = 0;
        this.mapShiftY = 0;
        this.viewX = this.protocol_viewX = 0;
        this.viewY = this.protocol_viewY = 0;
        this.leaderboard = [];
        if (!a) return false;

        this.integrity = a.indexOf('agar.io') > -1;
        this.client_protocol = a.indexOf('~') > -1 ? 6 : 23;
        this.socket = new WebSocket(a);
        this.socket.binaryType = 'arraybuffer';

        this.socket.onopen = () => {
            this.onOpen();
        };

        this.socket.onmessage = c => {
            this.onMessage(c);
        };

        this.socket.onerror = c => {
            this.onError(c);
        };

        this.socket.onclose = c => {
            this.onClose(c);
        };

        application.emit('connecting', this);
    }
    onOpen() {
        console.log('Game server socket opened');
        this.time = Date.now();
        let a = this.createView(5);
        a.setUint8(0, 254);

        a.setUint32(1, this.integrity ? this.client_protocol : 22, true);
        this.sendMessage(a);
        a = this.createView(5);
        a.setUint8(0, 255);

        a.setUint32(1, master.client_version, true);
        this.sendMessage(a);
        this.connectionOpened = true;
        this.connectionTime = new Date();
        application.emit('connect', this);
    }
    sleep(a) {
        return new Promise(b => setTimeout(b, a));
    }
    onMessage(a) {
        a = new DataView(a.data);

        if (this.protocolKey)
            a = this.shiftMessage(a, this.protocolKey ^ master.client_version);

        this.handleMessage(a);
    }
    onError() {
        this.error('Game socket error');
        this.flushCellsData();
        application.emit('error', this);
    }
    onClose(a) {
        console.log('Game socket closed');
        this.flushCellsData();
        this.emit('closed');

        if (a !== true)
            application.emit('close', this);
    }
    closeConnection(a) {
        this.flushCellsData();
        this.shutup = a;
        if (this.socket) {
            this.socket.onopen = null;
            this.socket.onmessage = null;
            this.socket.onerror = null;
            this.socket.onclose = null;
            try {
                this.socket.close();
            } catch (b) {}
            this.socket = null;
            this.ws = null;
        }
        this.onClose(a);
    }
    isSocketOpen() {
        return this.socket !== null && this.socket.readyState === this.socket.OPEN;
    }
    writeUint32(a, b) {
        while (true) {
            if ((b & -128) == 0) {
                a.push(b);
                return;
            } else {
                a.push(b & 127 | 128);
                b = b >>> 7;
            }
        }
    }
    createView(a) {
        return new DataView(new ArrayBuffer(a));
    }
    sendBuffer(a) {
        this.socket.send(a.buffer);
    }
    sendMessage(a) {
        if (this.connectionOpened && this.integrity) {
            if (!this.clientKey) return;
            a = this.shiftMessage(a, this.clientKey);
            this.clientKey = this.shiftKey(this.clientKey);
        }
        this.sendBuffer(a);
    }
    sendAction(a) {
        if (!this.isSocketOpen()) return;
        const b = this.createView(1);
        b.setUint8(0, a);
        this.sendMessage(b);
    }
    sendSpectate() {
        this.isSpectateEnabled = true;
        this.sendAction(1);
    }
    sendFreeSpectate() {
        this.isFreeSpectate = !this.isFreeSpectate;
        this.sendAction(18);
    }
    sendEject() {
        this.sendCursorPosition();
        this.sendAction(21);
    }
    sendSplit() {
        this.sendCursorPosition();
        this.sendAction(17);
    }
    doubleSplit() {
        this.sendSplit();

        setTimeout(() => {
            this.sendSplit();
        }, 40);
    }
    popSplit() {
        this.sendSplit();

        setTimeout(() => {
            this.sendSplit();
        }, 200);
    }
    tripleSplit() {
        this.sendSplit();

        setTimeout(() => {
            this.sendSplit();
        }, 40);

        setTimeout(() => {
            this.sendSplit();
        }, 80);
    }
    split16() {
        this.sendSplit();

        setTimeout(() => {
            this.sendSplit();
        }, 40);

        setTimeout(() => {
            this.sendSplit();
        }, 80);

        setTimeout(() => {
            this.sendSplit();
        }, 120);
    }
      split64() {
        this.sendSplit();

        setTimeout(() => {
            this.sendSplit();
        }, 0);

        setTimeout(() => {
            this.sendSplit();
        }, 0);

        setTimeout(() => {
            this.sendSplit();
        }, 0);
        
        setTimeout(() => {
            this.sendSplit();
        }, 0);
        setTimeout(() => {
            this.sendSplit();
        }, 0);
    }
    sendNick(a) {

        window.lastNick = a;
        window.myTurn = true;

        this.playerNick = a;
        if (this.integrity) agarCaptcha.requestCaptchaV3('play', b => {
            this.sendNick2(a, b);

            if (this.gotCaptcha) {
                console.log('Connection have unsolved recaptcha!');
                application.emit('captcha', this);
            }
        });

        if (!this.integrity)
            this.sendNick2(a, '0');
    }
    sendNick2(a, b) {
        this.playerNick = a;
        a = window.unescape(window.encodeURIComponent(a));
        const view = this.createView(3 + a.length + b.length);
        let buftes = [];
        for (let i = 0; i < 3 + a.length + b.length; i++) buftes.push(0);
        for (let length = 0; length < a.length; length++) {
            view.setUint8(length + 1, a.charCodeAt(length));
            //buftes[length+1] = nick.charCodeAt(length)
        }
        for (let len = 0; len < b.length; len++) {
            view.setUint8(a.length + 2 + len, b.charCodeAt(len));
            //buftes[nick.length + 2 + len] = token.charCodeAt(len);
        }
        this.sendMessage(view);
        //console.log(buftes);
        myTurn = false;
        //return recaptchaExecuteLoop();
    }

    sendCursorPosition() {

        if (!this.isSocketOpen() || !this.connectionOpened || !this.clientKey && this.integrity) return;

        let cursorX = this.cursorX;
        let cursorY = this.cursorY;




        if (tempsett.pause || this.type === 3) {
            cursorX = this.targetX;
            cursorY = this.targetY;
            if (typeof CheckWichTabCursorX !== 'undefined' && CheckWichTabCursorY !== 'undefined') {
                CheckWichTabCursorX = this.targetX;
                CheckWichTabCursorY = this.targetY;
            }
        }

        cursorX = this.serverX(cursorX);
        cursorY = this.serverY(cursorY);
        const c = this.createView(13);
        c.setUint8(0, 16);
        c.setInt32(1, cursorX, true);
        c.setInt32(5, cursorY, true);
        c.setUint32(9, this.protocolKey, true);
        this.sendMessage(c);
    }
    sendAccessToken(a, b, c) {
        if (!this.integrity) return;
        if (this.accessTokenSent) return;

        if (!c)
            c = 102;

        const d = 5,
            f = a.length,
            g = master.client_version_string.length;
        let h = [c, 8, 1, 18];
        this.writeUint32(h, f + g + 23);
        h.push(8, 10, 82);
        this.writeUint32(h, f + g + 18);
        h.push(8, b, 18, g + 8, 8, d, 18, g);
        for (var i = 0; i < g; i++) {
            h.push(master.client_version_string.charCodeAt(i));
        }
        h.push(24, 0, 32, 0, 26);
        this.writeUint32(h, f + 3);
        h.push(10);
        this.writeUint32(h, f);
        for (i = 0; i < f; i++) {
            h.push(a.charCodeAt(i));
        }
        h = new Uint8Array(h);
        const j = new DataView(h.buffer);
        this.sendMessage(j);
    }
    sendFbToken(a) {
        console.log('Logging via FB');
        this.sendAccessToken(a, 2);
    }
    sendGplusToken(a) {
        console.log('Logging via GL');
        this.sendAccessToken(a, 4);
    }
    sendRecaptcha(a) {
        this.gotCaptcha = false;
        const b = this.createView(2 + a.length);
        b.setUint8(0, 86);
        for (let c = 0; c < a.length; c++) {
            b.setUint8(1 + c, a.charCodeAt(c));
        }
        b.setUint8(a.length + 1, 0);
        this.sendMessage(b);
    }
    setClientVersion(a, b) {
        this.client_version = a;
        this.client_version_string = b;
        console.log('Received client version:', a, b);
    }
    generateClientKey(a, b) {
        if (!a.length || !b.byteLength) return null;
        let c = null;
        const d = 1540483477,
            f = a.match(/(ws+:\/\/)([^:]*)(:\d+)?/)[2],
            g = f.length + b.byteLength,
            h = new Uint8Array(g);
        for (let n = 0; n < f.length; n++) {
            h[n] = f.charCodeAt(n);
        }
        h.set(b, f.length);
        const i = new DataView(h.buffer);
        let j = g - 1;
        const k = (j - 4 & -4) + 4 | 0;
        let l = j ^ 255,
            m = 0;
        while (j > 3) {
            c = Math.imul(i.getInt32(m, true), d) | 0;
            l = (Math.imul(c >>> 24 ^ c, d) | 0) ^ (Math.imul(l, d) | 0);
            j -= 4;
            m += 4;
        }
        switch (j) {
            case 3:
                l = h[k + 2] << 16 ^ l;
                l = h[k + 1] << 8 ^ l;
                break;
            case 2:
                l = h[k + 1] << 8 ^ l;
                break;
            case 1:
                break;
            default:
                c = l;
                break;
        }

        if (c != l)
            c = Math.imul(h[k] ^ l, d) | 0;

        l = c >>> 13;
        c = l ^ c;
        c = Math.imul(c, d) | 0;
        l = c >>> 15;
        c = l ^ c;
        console.log('Generated client key:', c);
        return c;
    }
    shiftKey(a) {
        const b = 1540483477;
        a = Math.imul(a, b) | 0;
        a = (Math.imul(a >>> 24 ^ a, b) | 0) ^ 114296087;
        a = Math.imul(a >>> 13 ^ a, b) | 0;
        return a >>> 15 ^ a;
    }
    shiftMessage(a, b, c) {
        if (!c)
            for (var d = 0; d < a.byteLength; d++) {
                a.setUint8(d, a.getUint8(d) ^ b >>> d % 4 * 8 & 255);
            } else
                for (var d = 0; d < a.length; d++) {
                    a.writeUInt8(a.readUInt8(d) ^ b >>> d % 4 * 8 & 255, d);
                }
        return a;
    }
    decompressMessage(a) {
        const b = window.buffer.Buffer,
            c = new b(a.buffer),
            d = new b(c.readUInt32LE(1));
        this.uncompressBuffer(c.slice(5), d);
        return d;
    }
    uncompressBuffer(a, b) {
        for (let c = 0, d = 0; c < a.length;) {
            const f = a[c++];
            let g = f >> 4;
            if (g > 0) {
                let o = g + 240;
                while (o === 255) {
                    o = a[c++];
                    g += o;
                }
                const p = c + g;
                while (c < p) b[d++] = a[c++];
                if (c === a.length) return b;
            }
            const h = a[c++] | a[c++] << 8;
            if (h === 0 || h > d) return -(c - 2);
            let k = f & 15,
                l = k + 240;
            while (l === 255) {
                l = a[c++];
                k += l;
            }
            let m = d - h;
            const n = d + k + 4;
            while (d < n) b[d++] = b[m++];
        }
        return b;
    }
    handleMessage(a) {
        const b = () => {
            for (var w = '';;) {
                const z = a.getUint8(c++);
                if (z == 0) break;
                w += String.fromCharCode(z);
            }
            return w;
        };
        var c = 0;
        let d = a.getUint8(c++);

        if (d == 54)
            d = 53;

        switch (d) {
            case 5:
                break;
            case 17:
                this.viewX = this.receiveX(a.getFloat32(c, true));
                this.protocol_viewX = this.viewX;
                c += 4;
                this.viewY = this.receiveY(a.getFloat32(c, true));
                this.protocol_viewY = this.viewY;
                c += 4;
                this.scale = a.getFloat32(c, true);
                break;
            case 18:
                if (this.protocolKey)
                    this.protocolKey = this.shiftKey(this.protocolKey);

                this.flushCellsData();
                break;
            case 32:
                const w = a.getUint32(c, true);
                this.playerCellIDs.push(w);
                this.isSpectateEnabled = false;
                var f = this.indexedCells[w];

                if (f) {
                    console.log('IT HAPPENS');

                    if (this.playerCells.indexOf(f) == -1) {
                        f.isPlayerCell = true;
                        this.playerColor = f.color;
                        this.playerCells.push(f);
                        console.log('PLAYER CELL FIX!');
                        toastr.info('Spawn fixed');
                    }
                }

                if (!this.play) {
                    this.play = true;
                    this.playerColor = null;
                    this.emit('spawn', this);
                    application.emit('spawn', this);

                }

                break;
            case 49:
                this.leaderboard = [];
                this.playerPosition = 0;

                function z() {
                    var I = '',
                        J;
                    while ((J = a.getUint8(c, 1)) != 0) {
                        c += 1;
                        I += String.fromCharCode(J);
                    }
                    c += 1;
                    return I;
                }
                var g = a.getUint32(c, true);
                c += 4;
                for (let I = 0; c < a.byteLength;) {
                    let J = '',
                        K = 0,
                        L = false;
                    I++;
                    K = a.getUint32(c, true);

                    if (K == 1) {
                        K = 'isPlayer';
                        this.playerPosition = I;
                    }

                    c += 4;
                    J = decodeURIComponent(escape(z()));

                    this.leaderboard.push({
                        nick: J,
                        id: K,
                        isFriend: L
                    });
                }
                application.handleLeaderboard(this);
                break;
            case 50:
                this.pieChart = [];
                const A = a.getUint32(c, true);
                c += 4;
                for (var h = 0; h < A; h++) {
                    this.pieChart.push(a.getFloat32(c, true));
                    c += 4;
                }
                application.emit('piechart', this);
                break;
            case 53:
                this.leaderboard = [];
                this.playerPosition = 0;
                if (a.getUint8(0) == 54) {
                    const M = a.getUint16(c, true);
                    c += 2;
                }
                for (let N = 0; c < a.byteLength;) {
                    var j = a.getUint8(c++);
                    let O = '',
                        P = 0,
                        Q = false;
                    N++;

                    if (j & 2)
                        O = window.decodeURIComponent(window.escape(b()));

                    if (j & 4) {
                        P = a.getUint32(c, true);
                        c += 4;
                    }

                    if (j & 8) {
                        O = this.playerNick;
                        P = 'isPlayer';
                        this.playerPosition = N;
                    }

                    if (j & 16)
                        Q = true;

                    this.leaderboard.push({
                        nick: O,
                        id: P,
                        isFriend: Q
                    });
                }
                application.handleLeaderboard(this);
                break;
            case 54:
                console.log(a);
                break;
            case 69:
                var h = a.getUint16(c, true);
                c += 2;
                this.ghostCells = [];
                this.ghostCellsStep++;
                for (u = 0; u < h; u++) {
                    var k = a.getInt32(c, true);
                    c += 4;
                    var l = a.getInt32(c, true);
                    c += 4;
                    var m = a.getUint32(c, true);
                    c += 4;
                    c += 1;
                    var n = ~~Math.sqrt(100 * m);
                    this.ghostCells.push({
                        x: this.receiveX(k),
                        y: this.receiveY(l),
                        rx: this.shiftX(this.shrinkX(k)),
                        ry: this.shiftY(this.shrinkY(l)),
                        size: n,
                        mass: m,
                        inView: false
                    });

                }

                if (settings.mapLocalFix3 && this.ghostCellsStep == 1 && this.ghostCells[0]) {
                    console.log('Ready for reflection');
                    this.quadrant = this.calcQuadrant(this.ghostCells[0].x, this.ghostCells[0].y);
                    this.realQuadrant = this.calcQuadrant(this.ghostCells[0].rx, this.ghostCells[0].ry);
                    this.setQuadrant(this.lastQuadrant);
                }

                this.ghostCells[0] ? (this.quadrant = this.calcQuadrant(this.ghostCells[0].x, this.ghostCells[0].y), this.realQuadrant = this.calcQuadrant(this.ghostCells[0].rx, this.ghostCells[0].ry), this.lastRealQuadrant !== this.realQuadrant && this.emit('quadrant', this.quadrant), this.lastRealQuadrant = this.realQuadrant, this.lastQuadrant = this.quadrant) : this.quadrant = 4;

                if (this.ghostCellsStep == 1 && this.ghostCells[0] && this.modeInt !== 3)
                    this.emit('requestQuadrant', this);

                application.handleGhostCells(this);

                break;
            case 85:
                this.gotCaptcha = true;
                console.log('Captcha requested');
                application.emit('captcha', this);
                break;
            case 102:
                const B = new Node(a, c);
                var j = B.readFlag();

                if (j == 1)
                    B.setContentType();

                j = B.readFlag();

                if (j == 2)
                    B.setUncompressedSize();

                j = B.readFlag();
                var o = new buffer.Buffer(a.buffer),
                    p = o.indexOf('coin') + 9;
                for (var q = p; a.byteLength > q; q++)
                    if (o.readUIntLE(q) == 74) break;
                try {} catch (R) {}
                if (j == 1) {
                    const S = B.readUint32(),
                        T = B.readFlag(),
                        U = B.readUint32();
                    switch (S) {
                        case 11:
                            break;
                        case 62:
                            var r = Array.from(new Uint8Array(a.buffer)).map(V => {
                                return String.fromCharCode(V);
                            }).join('');
                            break;
                        default:
                    }
                }

                if (a.byteLength < 20) {
                    this.loggedIn = false;
                    application.emit('logout', this);
                }

                break;
            case 103:
                this.accessTokenSent = true;
                break;
            case 104:
                break;
            case 114:
                console.error('[Agario] Spectate mode is full');
                break;
            case 160:
                break;
            case 161:
                break;
            case 176:
                this.battleRoyale.startTime = a.getUint32(c, true);
                break;
            case 177:
                this.battleRoyale.joined = true;
                break;
            case 178:
                this.battleRoyale.players = a.getUint16(c, true);
                c += 2;
                var j = a.getUint16(c, true);
                c += 2;

                if (!j) {
                    this.battleRoyale.state = 0;
                    this.battleRoyale.joined = false;
                }

                if (j & 3) {
                    this.battleRoyale.state = a.getUint8(c++);
                    this.battleRoyale.x = a.getInt32(c, true);
                    c += 4;
                    this.battleRoyale.y = a.getInt32(c, true);
                    c += 4;
                    this.battleRoyale.radius = a.getUint32(c, true);
                    c += 4;
                    this.battleRoyale.shrinkTime = a.getUint32(c, true) * 1000;
                    c += 4;

                    if (this.battleRoyale.shrinkTime) {
                        this.battleRoyale.timeLeft = ~~((this.battleRoyale.shrinkTime - Date.now() + this.serverTimeDiff) / 1000);

                        if (this.battleRoyale.timeLeft < 0)
                            this.battleRoyale.timeLeft = 0;
                    }
                }

                if (j & 2) {
                    this.battleRoyale.targetX = a.getInt32(c, true);
                    c += 4;
                    this.battleRoyale.targetY = a.getInt32(c, true);
                    c += 4;
                    this.battleRoyale.targetRadius = a.getUint32(c, true);
                }

                break;
            case 179:
                console.log(179);
                var j = a.getUint8(c);
                const C = window.decodeURIComponent(window.escape(b()));
                let D = null;

                if (!j) {
                    D = window.decodeURIComponent(window.escape(b()));
                    console.log('179', C, D);
                }

                break;
            case 180:
                this.battleRoyale.joined = false;
                this.battleRoyale.rank = [];
                this.battleRoyale.playerRank = a.getUint32(c, true);
                c += 8;
                const E = a.getUint16(c, true);
                c += 2;
                for (var h = 0; h < E; h++) {
                    const V = window.decodeURIComponent(window.escape(b())),
                        W = a.getUint32(c, true);
                    c += 4;

                    this.battleRoyale.rank.push({
                        place: W,
                        name: V
                    });
                }
                break;
            case 226:
                const F = a.getUint16(1, true);
                a = this.createView(3);
                a.setUint8(0, 227);
                a.setUint16(1, F);
                this.sendMessage(a);
                break;
            case 241:
                this.protocolKey = a.getUint32(c, true);
                const G = new Uint8Array(a.buffer, c += 4);
                this.clientKey = this.generateClientKey(this.ws, G);
                this.estabilished = true;
                application.emit('estabilished', this);
                this.emit('estabilished', this);
                var s = '',
                    t = a.getUint32(c, true);
                for (var u = 5; u < 11; u++) {
                    s += String.fromCharCode(a.getUint8(c += 1, true));
                }
                console.log('Received protocol key:', this.protocolKey, 'v' + s);
                break;
            case 242:
                this.serverTime = a.getUint32(c, true) * 1000;
                this.serverTimeDiff = Date.now() - this.serverTime;
                break;
            case 255:
                this.handleSubmessage(a);
                break;
            case 16:
                this.updateCells(new buffer.Buffer(a.buffer), c);
                this.countPps();
                break;
            case 64:
                const H = () => {
                    for (var X = '';;) {
                        const Y = v.readUInt8(c++);
                        if (Y == 0) break;
                        X += String.fromCharCode(Y);
                    }
                    return X;
                };
                var v = new buffer.Buffer(a.buffer);
                this.viewMinX = v.readDoubleLE(c);
                c += 8;
                this.viewMinY = v.readDoubleLE(c);
                c += 8;
                this.viewMaxX = v.readDoubleLE(c);
                c += 8;
                this.viewMaxY = v.readDoubleLE(c);
                c += 8;
                c += 4;
                try {
                    const X = H();

                    if (X) {
                        this.estabilished = true;
                        application.emit('estabilished', this);
                        this.emit('estabilished', this);
                        console.log('string', X);
                    }
                } catch (Y) {}
                this.setMapOffset(this.viewMinX, this.viewMinY, this.viewMaxX, this.viewMaxY);
                break;
            default:
                console.log('Unknown opcode:', a.getUint8(0), a);
                break;
        }
    }
    disconnectMessage(a) {
        switch (a) {
            case 1:
                this.error('User disconnected. Incompatible client');
                break;
            case 2:
                this.error('User disconnected. Packet not authorized');
                break;
            case 3:
                this.error('User disconnected. Login elsewhere');
                break;
            case 4:
                this.error('User disconnected. Server offline');
                break;
            case 5:
                this.error('User disconnected. User banned');
                break;
            case 6:
                this.error('User disconnected. Ping error');
                break;
            case 7:
                this.error('User disconnected. Unknown game type');
                break;
            case 8:
                this.error('User disconnected. Too many operations');
                break;
            case 9:
                this.error('User disconnected. Unreachable realm');
                break;
            case 10:
                this.error('User disconnected. User deleted');
                break;
            case 11:
                this.error('User disconnected. Not authorized by realm');
                break;
            case 12:
                this.error('User disconnected. Bad request');
                break;
            case 13:
                this.error('User disconnected. Reset by peer');
                break;
            case 14:
                this.error('User disconnected. Invalid token');
                break;
            case 15:
                this.error('User disconnected. Expired token');
                break;
            case 16:
                this.error('User disconnected. State transfer error');
                break;
            default:
                this.error('User disconnected. Unknown error: ' + a);
        }
    }
    countPps() {
        if (!settings.showStatsPPS) return;
        const a = Date.now();

        if (!this.ppsLastRequest)
            this.ppsLastRequest = a;

        if (a - this.ppsLastRequest >= 1000) {
            this.pps = this.totalPackets;
            this.totalPackets = 0;
            this.ppsLastRequest = a;
        }

        this.totalPackets++;
    }
    handleSubmessage(a) {
        a = this.decompressMessage(a);
        let b = 0;
        switch (a.readUInt8(b++)) {
            case 16:
                this.updateCells(a, b);
                this.countPps();
                break;
            case 64:
                this.viewMinX = a.readDoubleLE(b);
                b += 8;
                this.viewMinY = a.readDoubleLE(b);
                b += 8;
                this.viewMaxX = a.readDoubleLE(b);
                b += 8;
                this.viewMaxY = a.readDoubleLE(b);
                b += 8;
                if (a.byteLength > b) {
                    var c = a.readUInt8(b++);
                    this.modeInt = c;
                    switch (c) {
                        case 1:
                            this.gameMode = ':ffa';
                            break;
                        case 2:
                            this.gameMode = ':battleroyale';
                            break;
                        case 3:
                            this.gameMode = ':party';
                            break;
                        case 4:
                            this.gameMode = ':experimental';
                            break;
                        case 5:
                            this.gameMode = ':teams';
                            break;
                        default:
                            this.gameMode = ':ffa';
                    }
                    application.emit('gameMode', this);
                    this.emit('gameMode', this);
                }
                this.setMapOffset(this.viewMinX, this.viewMinY, this.viewMaxX, this.viewMaxY);
                break;
            default:
                console.log('[Connection] Unknown sub opcode:', a.readUInt8(0), a);
                break;
        }
    }
    unshrinkX(a) {
        return a / this.mapShrinkW;
    }
    unshrinkY(a) {
        return a / this.mapShrinkH;
    }
    shrinkX(a) {
        return a * this.mapShrinkW;
    }
    shrinkY(a) {
        return a * this.mapShrinkH;
    }
    unshiftX(a) {
        return a - -this.mapShiftX;
    }
    unshiftY(a) {
        return a - -this.mapShiftY;
    }
    shiftX(a, b) {
        return !b ? a - this.mapShiftX : a;
    }
    shiftY(a, b) {
        return !b ? a - this.mapShiftY : a;
    }
    invflipX(a) {
        return !!this.mirrorH ? a : this.mapMaxX - (a - this.mapMinX);
    }
    invflipY(a) {
        return !!this.mirrorV ? a : this.mapMaxY - (a - this.mapMinY);
    }
    flipX(a) {
        return !this.mirrorH ? a : this.mapMaxX - (a - this.mapMinX);
    }
    flipY(a) {
        return !this.mirrorV ? a : this.mapMaxY - (a - this.mapMinY);
    }
    receiveX(a) {
        a = this.shrinkX(a);
        a = this.shiftX(a);
        a = this.flipX(a);
        return a;
    }
    receiveY(a) {
        a = this.shrinkY(a);
        a = this.shiftY(a);
        a = this.flipY(a);
        return a;
    }
    serverX(a) {
        a = this.flipX(a);
        a = this.unshiftX(a);
        a = this.unshrinkX(a);
        return a;
    }
    serverY(a) {
        a = this.flipY(a);
        a = this.unshiftY(a);
        a = this.unshrinkY(a);
        return a;
    }
    setQuadrant(a, b) {
        var mirrorV = false,
            mirrorH = false,
            f = b || this.realQuadrant;

        if (a == false) {
            mirrorV = false;
            mirrorH = false;
        }

        if (f == 0) {
            mirrorV = a == 2 || a == 3;
            mirrorH = a == 1 || a == 2;
        } else {
            if (f == 1) {
                mirrorV = a == 2 || a == 3;
                mirrorH = a == 0 || a == 3;
            } else {
                if (f == 2) {
                    mirrorV = a == 1 || a == 0;
                    mirrorH = a == 0 || a == 3;
                } else if (f == 3) {
                    mirrorV = a == 1 || a == 0;
                    mirrorH = a == 1 || a == 2;
                }
            }
        }
        this.flipCells(mirrorV, mirrorH);
        this.mirrorV = mirrorV;
        this.mirrorH = mirrorH;
    }
    flipCells(a, b) {
        //his.playerX = /*Math.round*/ (window.user.ghostX / (this.ghostCells[0].x + this.mapOffsetX)) < 0 ? -1 : 1;
        //this.playerY = /*Math.round*/ (window.user.ghostY / (this.ghostCells[0].y + this.mapOffsetY)) < 0 ? -1 : 1;
        for (var c in this.indexedCells) {
            const d = this.indexedCells[c];
            d.x = b ? this.invflipX(d.x) : this.flipX(d.x);
            d.y = a ? this.invflipY(d.y) : this.flipY(d.y);
            d.targetX = b ? this.invflipX(d.targetX) : this.flipX(d.targetX);
            d.targetY = a ? this.invflipY(d.targetY) : this.flipY(d.targetY);
        }
    }
    calcQuadrant(a, b) {
        if (a === undefined && b == undefined) {
            a = this.viewX;
            b = this.viewY;
        }
        var c = 5,
            d = a < this.mapMidX + c && a > this.mapMidX - c || b < this.mapMidY + c && b > this.mapMidY - c ? 4 : a >= this.mapMidX && b < this.mapMidY ? 0 : a < this.mapMidX && b < this.mapMidY ? 1 : a < this.mapMidX && b >= this.mapMidY ? 2 : 3;
        return d;
    }
    flushCellsData() {
        this.isFreeSpectate = false;
        this.isSpectateEnabled = false;
        this.quadrant = null;
        this.realQuadrant = null;
        this.lastQuadrant = this.lastQuadrant = this.ws != this.lastws ? null : this.lastQuadrant;
        this.mirrorH = false;
        this.mirrorV = false;
        this.ghostCellsStep = 0;

        this.bound = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };

        this.gameMode = null;
        this.modeInt = 3;
        this.ghostCells = [];
        this.play = false;
        for (let a in this.indexedCells) {
            const b = this.indexedCells[a];
            this.removeCell(b);
        }
        this.ghostCells = [];
    }
    setMapOffset(left, top, right, bottom) {
        if (right - left > 14000 && bottom - top > 14000 || !this.integrity) {
            if (this.mapOffsetFixed) return;
            if (this.integrity) {
                var side = 14142;
                this.mapShrinkW = side / (right - left);
                this.mapShrinkH = side / (bottom - top);
                left = this.shrinkX(left, right - left, side);
                top = this.shrinkY(top, bottom - top, side);
                right = this.shrinkX(right, right - left, side);
                bottom = this.shrinkY(bottom, bottom - top, side);
            }
            this.mapShiftY = 0;
            this.mapShiftX = 0;
            var g = -((right - left) / 2),
                h = -((bottom - top) / 2),
                i = 0,
                j = 0;
            let k = g - left + i,
                l = h - top + j;
            this.mapShiftX = i - k;
            this.mapShiftY = j - l;
            left = this.shiftX(left);
            top = this.shiftY(top);
            right = this.shiftX(right);
            bottom = this.shiftY(bottom);
            this.mapOffsetX = (right - left) / 2 - right;
            this.mapOffsetY = (bottom - top) / 2 - bottom;
            this.mapMinX = left;
            this.mapMinY = top;
            this.mapMaxX = right;
            this.mapMaxY = bottom;
            this.mapMidX = (this.mapMaxX + this.mapMinX) / 2;
            this.mapMidY = (this.mapMaxY + this.mapMinY) / 2;

            if (!this.mapOffsetFixed) {
                this.viewX = (right + left) / 2;
                this.viewY = (bottom + top) / 2;
            }

            this.mapOffsetFixed = true;
            console.log('Map offset fixed (x, y):', this.mapOffsetX, this.mapOffsetY);

            this.emit('offset', this);
        } else {
            this.viewportMinX = this.receiveX(left);
            this.viewportMinY = this.receiveY(top);
            this.viewportMaxX = this.receiveX(right);
            this.viewportMaxY = this.receiveY(bottom);
        }
    }
    updateBound() {
        this.cells.forEach(a => {
            this.bound.left = a.targetX;
            this.bound.right = a.targetX;
            this.bound.top = a.targetY;
            this.bound.bottom = a.targetY;
        });
    }
    updateStaticBound(a) {
        let b = 0,
            c = 0;

        if (this.bound.left > a.targetX - b + a.size)
            this.bound.left = a.targetX - b + a.size;

        if (this.bound.right < a.targetX - b - a.size)
            this.bound.right = a.targetX - b - a.size;

        if (this.bound.top > a.targetY - c + a.size)
            this.bound.top = a.targetY - c + a.size;

        if (this.bound.bottom < a.targetY - c - a.size)
            this.bound.bottom = a.targetY - c - a.size;
    }
    isInViewHSLO(a) {
        const b = a.targetX,
            c = a.targetY,
            d = this.bound;
        return !(b + a.size < d.left || b - a.size > d.right || c + a.size < d.top || c - a.size > d.bottom);
    }
    isInViewGhost(a) {
        const b = a.x,
            c = a.y,
            d = this.bound;
        return !(b + a.size < d.left || b - a.size > d.right || c + a.size < d.top || c - a.size > d.bottom);
    }
    calcViewport(a) {
        var b = 0,
            c = 1.995,
            d = this.integrity ? 0.98 : 1;
        if (this.playerCells.length > 0)
            for (var f = 0; this.playerCells.length > f; f++) b += this.playerCells[f].size;
        else {
            if (this.isFreeSpectate == false && this.isSpectateEnabled == true) {
                if (!this.integrity)
                    for (var g = 0; this.leaderboard.length > g; g++) {
                        for (var f = 0; this.cells.length > f; f++)
                            if (this.cells[f].nick == this.leaderboard[g].nick) b += this.cells[f].size;
                        break;
                    } else
                        for (var g = 0; this.leaderboard.length > g; g++) {
                            for (var f = 0; this.cells.length > f; f++)
                                if (this.cells[f].accountID == this.leaderboard[g].id) b += this.cells[f].size;
                            break;
                        }
            } else {
                if (this.isFreeSpectate && this.isSpectateEnabled) c = 4.95;
            }
        }
        var h = Math.pow(Math.min(64 / (b * d), 1), 0.4);
        this.viewportW2s = 1024 / h / 2 * c;
        this.viewportH2s = 600 / h / 2 * c;

        if (a) {
            this.bound.left = this.protocol_viewX - this.viewportW2s;
            this.bound.top = this.protocol_viewY - this.viewportH2s;
            this.bound.right = this.protocol_viewX + this.viewportW2s;
            this.bound.bottom = this.protocol_viewY + this.viewportH2s;
        }
    }
    isInViewport(a, b, c) {
        if (a + c < this.protocol_viewX - this.viewportW2s || b + c < this.protocol_viewY - this.viewportH2s || a - c > this.protocol_viewX + this.viewportW2s || b - c > this.protocol_viewY + this.viewportH2s) return false;
        return true;
    }
    isInViewport2(a) {
        var b = a.targetX,
            c = a.targetY,
            d = a.size;
        if (b + d < this.bound.left || c + d < this.bound.top || b - d > this.bound.right || c - d > this.bound.bottom) return false;
        return true;
    }
    circleInViewport(a, b, c) {
        var d = {
                x: this.viewX - this.viewportW2s,
                y: this.viewY - this.viewportH2s,
                w: this.viewportW2s * 2,
                h: this.viewportH2s * 2
            },
            f = Math.abs(a - this.viewX),
            g = Math.abs(b - this.viewY);
        if (f > this.viewportW2s + c) return false;
        if (g > this.viewportH2s + c) return false;
        if (f <= this.viewportW2s) return true;
        if (g <= this.viewportH2s) return true;
        var h = f - this.viewportW2s,
            i = g - this.viewportH2s;
        return h * h + i * i <= c * c;
    }
    isInView(a, b, c) {
        var d = drawRender.canvasWidth / 2 / this.scale,
            f = drawRender.canvasHeight / 2 / this.scale;
        if (a + c < this.viewX - d || b + c < this.viewY - f || a - c > this.viewX + d || b - c > this.viewY + f) return false;
        return true;
    }
    updateCells(a, c) {
        const d = () => {
            for (var l = '';;) {
                const m = a.readUInt8(c++);
                if (m == 0) break;
                l += String.fromCharCode(m);
            }
            return l;
        };
        this.time = Date.now();
        this.removePlayerCell = false;
        let f = a.readUInt16LE(c);
        c += 2;
        for (var h = 0; h < f; h++) {
            const l = a.readUInt32LE(c),
                m = this.indexedCells[l],
                n = a.readUInt32LE(c + 4),
                o = this.indexedCells[n];
            c += 8;

            if (m && o) {
                o.targetX = m.x;
                o.targetY = m.y;
                o.targetSize = o.size;
                o.time = this.time;
                this.removeCell(o);
            }
        }
        while (true) {
            var i = a.readUInt32LE(c);
            c += 4;
            if (i == 0) break;
            let p = this.receiveX(a.readInt32LE(c));
            c += 4;
            let q = this.receiveY(a.readInt32LE(c));
            c += 4;
            const s = a.readUInt16LE(c);
            c += 2;
            const t = a.readUInt8(c++);
            let u = null,
                v = null,
                w = '',
                z = null,
                A = 0;
            if (t & 128) A = a.readUInt8(c++);
            if (t & 2) {
                const D = a.readUInt8(c++),
                    E = a.readUInt8(c++),
                    F = a.readUInt8(c++);
                u = this.rgb2Hex(~~(D * 0.9), ~~(E * 0.9), ~~(F * 0.9));
            }
            if (t & 4) v = d();

            if (t & 8) {
                w = decodeURIComponent(escape(d()));

                if (w.indexOf('AGARBOT') > -1)
                    w = 'MoreBots-OVH';
            }

            const B = t & 1,
                C = A & 1;

            if (A & 4) {
                z = a.readUInt32LE(c);
                c += 4;
            }

            var j = null;
            if (this.indexedCells[i]) {
                j = this.indexedCells[i];
                if (u) j.color = u;
            } else {
                j = new Cell(i, p, q, s, u, C, B, this.playerCellIDs.indexOf(i) > -1);
                j.c = this;
                j.time = this.time;

                if (window.pix)
                    j.initPixi();

                if (!C) {
                    if (B && settings.virusesRange) this.viruses.push(j);
                    this.cells.push(j);

                    if (this.playerCellIDs.indexOf(i) > -1 && this.playerCells.indexOf(j) == -1) {
                        j.isPlayerCell = true;
                        this.playerColor = u;
                        this.playerCells.push(j);
                    }

                    if (z) {
                        j.accountID = z;

                        if (this.modeInt !== 3 && this.modeInt !== 5 && !j.isPlayerCell)
                            j.color = 'hsl(' + (z << 314159) % 360 + ',95%,46%)';

                        this.cellAID.hasOwnProperty(z) ? this.cellAID[z].push(i) : this.cellAID[z] = [i];
                    }
                } else this.food.push(j);
                this.indexedCells[i] = j;
            }

            if (j.isPlayerCell)
                w = this.playerNick;

            if (w)
                j.targetNick = w;

            j.targetX = p;
            j.targetY = q;
            j.targetSize = s;
            j.isFood = C;
            j.isVirus = B;

            if (v) {
                j.hasVanillaCustomSkin = v.indexOf('%custom') > -1;
                j.skin = v;
            }

            if (window.pix)
                j.upldatePixi();
        }
        let k = a.readUInt16LE(c);
        c += 2;
        for (h = 0; h < k; h++) {
            var i = a.readUInt32LE(c);
            c += 4;
            j = this.indexedCells[i];

            if (j)
                this.removeCell(j);
        }

        if (this.removePlayerCell && !this.playerCells.length) {
            this.play = false;
            this.isSpectateEnabled = false;
            application.emit('death', this);
            this.emit('death', this);

        }

        (async() => {
            this.calcViewport(true);
            this.compareCells();
        })();
    }
    getCell(a) {}
    removeCell(a) {
        a.removed = true;
        let b = this.cells.indexOf(a);
        if (b != -1) {
            this.cells.splice(b, 1);
            if (this.cellAID.hasOwnProperty(a.accountID)) {
                let c = this.cellAID[a.accountID].indexOf(a.id);
                if (c != -1) {
                    this.cellAID[a.accountID].splice(c, 1);
                    if (this.cellAID[a.accountID].length == 0) delete this.cellAID[a.accountID];
                }
            }

            if (settings.virusesRange) {
                b = this.viruses.indexOf(a);

                if (b != -1)
                    this.viruses.splice(b, 1);
            }
        } else {
            b = this.food.indexOf(a);

            if (b != -1)
                this.food.splice(b, 1);
        }
        b = this.playerCells.indexOf(a);

        if (b != -1) {
            this.removePlayerCell = true;
            this.playerCells.splice(b, 1);
            b = this.playerCellIDs.indexOf(a.id);

            if (b != -1)
                this.playerCellIDs.splice(b, 1);
        }

        if (window.pix)
            a.removeFromStagePixi();

        if (a.redrawed)
            this.removedCells.push(a);

        delete this.indexedCells[a.id];
    }
    color2Hex(a) {
        const b = a.toString(16);
        return b.length == 1 ? '0' + b : b;
    }
    rgb2Hex(a, c, d) {
        return '#' + this.color2Hex(a) + this.color2Hex(c) + this.color2Hex(d);
    }
    HSLToHex(a, d, f) {
        d /= 100;
        f /= 100;
        let i = (1 - Math.abs(2 * f - 1)) * d,
            j = i * (1 - Math.abs(a / 60 % 2 - 1)),
            k = f - i / 2,
            n = 0,
            o = 0,
            p = 0;
        if (a >= 0 && a < 60) {
            n = i;
            o = j;
            p = 0;
        } else {
            if (a >= 60 && a < 120) {
                n = j;
                o = i;
                p = 0;
            } else {
                if (a >= 120 && a < 180) {
                    n = 0;
                    o = i;
                    p = j;
                } else {
                    if (a >= 180 && a < 240) {
                        n = 0;
                        o = j;
                        p = i;
                    } else {
                        if (a >= 240 && a < 300) {
                            n = j;
                            o = 0;
                            p = i;
                        } else if (a >= 300 && a < 360) {
                            n = i;
                            o = 0;
                            p = j;
                        }
                    }
                }
            }
        }
        n = Math.round((n + k) * 255).toString(16);
        o = Math.round((o + k) * 255).toString(16);
        p = Math.round((p + k) * 255).toString(16);
        if (n.length == 1) n = '0' + n;
        if (o.length == 1) o = '0' + o;
        if (p.length == 1) p = '0' + p;
        return '#' + n + o + p;
    }
    sortCellsBySize() {
        this.cells.sort((a, b) => a.size == b.size ? a.id - b.id : a.size - b.size);
    }
    calculatePlayerMassAndPosition() {
        let a = 0,
            b = 0,
            c = 0,
            d = 0;
        const f = this.playerCells.length;
        for (let g = 0; g < f; g++) {
            const h = this.playerCells[g];
            a += h.size;
            b += h.targetSize * h.targetSize;
            c += h.x / f;
            d += h.y / f;
        }
        this.viewX = c;
        this.viewY = d;
        this.protocol_viewX = c;
        this.protocol_viewY = d;
        this.playerSize = a;
        this.playerMass = ~~(b / 100);
        this.recalculatePlayerMass();
    }
    recalculatePlayerMass() {
        this.playerScore = Math.max(this.playerScore, this.playerMass);
        if (settings.virColors || settings.splitRange || settings.oppColors || settings.oppRings || settings.showStatsSTE) {
            const a = this.playerCells,
                b = a.length;
            a.sort((c, d) => c.size == d.size ? c.id - d.id : c.size - d.size);
            this.playerMinMass = ~~(a[0].size * a[0].size / 100);
            this.playerMaxMass = ~~(a[b - 1].size * a[b - 1].size / 100);
            this.playerSplitCells = b;
        }
        if (settings.showStatsSTE) {
            const c = tempsett.selectBiggestCell ? this.playerMaxMass : this.playerMinMass;
            c > 35 ? this.STE = ~~(c * (c < 1000 ? 0.35 : 0.38)) : this.STE = null;
        }
    }
    compareCells() {
        if (!this.play) return;
        if (settings.oppColors || settings.oppRings || settings.splitRange) {
            if (settings.oppRings || settings.splitRange) {
                this.biggerSTECellsCache = [];
                this.biggerSTEDCellsCache = [];
                this.biggerCellsCache = [];
                this.smallerCellsCache = [];
                this.STECellsCache = [];
            }

            for (const a of this.cells) {
                if (a.isVirus) continue;
                const b = ~~(a.size * a.size / 100),
                    c = tempsett.selectBiggestCell ? this.playerMaxMass : this.playerMinMass,
                    d = b / c,
                    f = c < 1000 ? 0.35 : 0.38;

                if (settings.oppColors && !settings.oppRings)
                    a.oppColor = this.setCellOppColor(a.isPlayerCell, d, f);

                if (!a.isPlayerCell && (settings.splitRange || settings.oppRings))
                    this.cacheCells(a, d, f);
            }
        }
    }
    cacheCells(a, b, c) {
        if (b >= 2.5) {
            this.biggerSTECellsCache.push(a);
            return;
        } else {
            if (b >= 1.25) {
                this.biggerCellsCache.push(a);
                return;
            } else {
                if (b < 1.25 && b > 0.75) return;
                else {
                    if (b > c) {
                        this.smallerCellsCache.push(a);
                        return;
                    } else {
                        this.STECellsCache.push(a);
                        return;
                    }
                }
            }
        }
    }
    setCellOppColor(a, b, c) {
        if (a) return profiles.masterProfile.color;
        if (b > 11) return '#FF008C';
        else {
            if (b >= 2.5) return '#BE00FF';
            else {
                if (b >= 1.25) return '#FF0A00';
                else {
                    if (b < 1.25 && b > 0.75) return '#FFDC00';
                    else return b > c ? '#00C8FF' : '#64FF00';
                }
            }
        }
    }
    setTargetPosition(a, b) {
        this.targetX = a - this.mapOffsetX;
        this.targetY = b - this.mapOffsetY;
        this.targetDistance = Math.round(Math.sqrt((this.playerX - this.targetX) ** 2 + (this.playerY - this.targetY) ** 2));
    }
    resetTargetPosition() {
        this.targetX = this.playerX;
        this.targetY = this.playerY;
    }
    escapeHTML(a) {
        return String(a).replace(/[&<>"'/]/g, b => escapeChar[b]);
    }
    removeEvents() {
        this.events = {};
    }
}