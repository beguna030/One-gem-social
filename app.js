"use strict";
const { useState, useRef } = React;
// Framer Motion, with a plain fallback so the page still renders if the library fails to load
const FM = window.Motion || {};
const passthrough = new Proxy({}, { get: (_, tag) => React.forwardRef(({ initial, animate, transition, whileHover, whileTap, whileInView, viewport, variants, ...p }, ref) => React.createElement(tag, { ...p, ref })) });
const motion = FM.motion || passthrough;
const useReducedMotion = FM.useReducedMotion || (() => true);
const GemMark = ({ size = 26 }) => (React.createElement("svg", { viewBox: "0 0 40 40", width: size, height: size, "aria-hidden": "true" },
    React.createElement("defs", null,
        React.createElement("linearGradient", { id: "gm", x1: "0", y1: "0", x2: "1", y2: "1" },
            React.createElement("stop", { offset: "0", stopColor: "var(--amethyst)" }),
            React.createElement("stop", { offset: "1", stopColor: "var(--aqua)" }))),
    React.createElement("path", { d: "M12 8h16l8 9-16 17L4 17z", fill: "url(#gm)" }),
    React.createElement("path", { d: "M4 17h32M12 8l8 26M28 8l-8 26M12 8l-4 9M28 8l4 9", stroke: "var(--night)", strokeWidth: "1.3", fill: "none", opacity: ".55" })));
// Faceted gem: crown + pavilion, each facet assembles on load
const FACETS = [
    { pts: "60,165 150,100 130,165", f: "a", o: .75, from: [-60, -40, -18] },
    { pts: "150,100 200,165 130,165", f: "b", o: .95, from: [-30, -70, 10] },
    { pts: "150,100 250,100 200,165", f: "c", o: 1, from: [0, -90, 0] },
    { pts: "250,100 270,165 200,165", f: "b", o: .85, from: [30, -70, -10] },
    { pts: "250,100 340,165 270,165", f: "a", o: .65, from: [60, -40, 18] },
    { pts: "60,165 130,165 200,350", f: "c", o: .7, from: [-80, 40, -14] },
    { pts: "130,165 200,165 200,350", f: "a", o: 1, from: [-30, 80, 8] },
    { pts: "200,165 270,165 200,350", f: "b", o: .9, from: [30, 80, -8] },
    { pts: "270,165 340,165 200,350", f: "c", o: .6, from: [80, 40, 14] },
];
function Gem() {
    const reduce = useReducedMotion();
    return (React.createElement(motion.div, { className: "gemstage", animate: reduce ? undefined : { y: [0, -10, 0] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.6 } },
        React.createElement("svg", { viewBox: "40 80 320 290", role: "img", "aria-label": "Geschliffener Edelstein, das Zeichen von One Gem" },
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: "fa", x1: "0", y1: "0", x2: "1", y2: "1" },
                    React.createElement("stop", { offset: "0", stopColor: "#C9A2FF" }),
                    React.createElement("stop", { offset: "1", stopColor: "#7A4BD9" })),
                React.createElement("linearGradient", { id: "fb", x1: "1", y1: "0", x2: "0", y2: "1" },
                    React.createElement("stop", { offset: "0", stopColor: "#9CF0EA" }),
                    React.createElement("stop", { offset: "1", stopColor: "#8A5CF0" })),
                React.createElement("linearGradient", { id: "fc", x1: "0", y1: "0", x2: "0", y2: "1" },
                    React.createElement("stop", { offset: "0", stopColor: "#E6D6FF" }),
                    React.createElement("stop", { offset: "1", stopColor: "#5F3AB8" })),
                React.createElement("linearGradient", { id: "shine", x1: "0", y1: "0", x2: "1", y2: "0" },
                    React.createElement("stop", { offset: "0", stopColor: "#fff", stopOpacity: "0" }),
                    React.createElement("stop", { offset: ".5", stopColor: "#fff", stopOpacity: ".55" }),
                    React.createElement("stop", { offset: "1", stopColor: "#fff", stopOpacity: "0" })),
                React.createElement("clipPath", { id: "gemclip" },
                    React.createElement("polygon", { points: "60,165 150,100 250,100 340,165 200,350" }))),
            FACETS.map((fc, i) => (React.createElement(motion.polygon, { key: i, points: fc.pts, fill: `url(#f${fc.f})`, fillOpacity: fc.o, stroke: "#120E1A", strokeOpacity: ".5", strokeWidth: "1.2", strokeLinejoin: "round", initial: reduce ? false : { x: fc.from[0], y: fc.from[1], rotate: fc.from[2], opacity: .2 }, animate: { x: 0, y: 0, rotate: 0, opacity: 1 }, transition: { type: "spring", stiffness: 70, damping: 14, delay: .25 + i * .06 }, style: { transformBox: "fill-box", transformOrigin: "center" } }))),
            !reduce && (React.createElement("g", { clipPath: "url(#gemclip)" },
                React.createElement(motion.rect, { y: "80", width: "70", height: "290", fill: "url(#shine)", transform: "skewX(-18)", initial: { x: -40 }, animate: { x: [-40, 440] }, transition: { duration: 1.6, delay: 1.4, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" } }))))));
}
function Hero() {
    const reduce = useReducedMotion();
    const line = (text, cls, i) => (React.createElement("span", { className: "line" },
        React.createElement(motion.span, { className: cls, initial: reduce ? false : { y: "105%" }, animate: { y: 0 }, transition: { duration: .8, ease: [.2, .7, .2, 1], delay: .1 + i * .12 } }, text)));
    return (React.createElement("header", { className: "hero", id: "top" },
        React.createElement("div", { className: "wrap" },
            React.createElement("div", null,
                React.createElement("h1", null,
                    line("Du machst", "", 0),
                    line("Content.", "", 1),
                    line("Wir den Rest.", "soft", 2)),
                React.createElement(motion.p, { className: "lede", initial: reduce ? false : { opacity: .3 }, animate: { opacity: 1 }, transition: { delay: .6, duration: .6 } }, "One Gem ist Social-Media-Management f\u00FCr Creator aus Berlin. Wir bringen dich auf TikTok LIVE, holen Kooperationen rein, entwickeln Video-Ideen mit dir und regeln Impressum und Papierkram."),
                React.createElement("div", { className: "ctas" },
                    React.createElement("a", { className: "btn gem", href: "#bewerben" }, "Jetzt bewerben"),
                    React.createElement("a", { className: "btn", href: "#live" }, "TikTok LIVE Network ansehen"))),
            React.createElement(Gem, null))));
}
const ITEMS = ["TikTok LIVE", "Kooperationen", "Video-Ideen", "Instagram & TikTok", "Impressum", "Management", "Hilfe bei Problemen"];
function Marquee() {
    const reduce = useReducedMotion();
    const row = ITEMS.map((t, i) => (React.createElement("span", { className: "item", key: i },
        t,
        React.createElement("svg", { viewBox: "0 0 14 14", "aria-hidden": "true" },
            React.createElement("path", { d: "M4 1h6l3 4-6 8-6-8z", fill: "var(--amethyst)" })))));
    return (React.createElement("div", { className: "marquee", "aria-label": "Was One Gem f\u00FCr dich \u00FCbernimmt" },
        React.createElement(motion.div, { className: "track", animate: reduce ? undefined : { x: ["0%", "-50%"] }, transition: { duration: 28, ease: "linear", repeat: Infinity } },
            row,
            React.createElement("span", { "aria-hidden": "true", style: { display: "contents" } }, row))));
}
const Icon = ({ d }) => React.createElement("span", { className: "ico" },
    React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, d));
function Tile({ className = "", children }) {
    const ref = useRef(null);
    const move = e => {
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    return React.createElement("div", { ref: ref, onMouseMove: move, className: `tile ${className}` }, children);
}
function Services() {
    return (React.createElement("section", { id: "creator" },
        React.createElement("div", { className: "wrap" },
            React.createElement("div", { className: "sechead" },
                React.createElement("h2", null, "Das Rundum-sorglos-Paket"),
                React.createElement("p", { className: "lede" }, "Du konzentrierst dich auf deine Videos. Alles drumherum \u00FCbernehmen wir, von der ersten Markenanfrage bis zur Frage, was im Impressum stehen muss.")),
            React.createElement("div", { className: "bento" },
                React.createElement(Tile, { className: "wide tall" },
                    React.createElement(Icon, { d: React.createElement(React.Fragment, null,
                            React.createElement("path", { d: "M7 11l3 3 7-7" }),
                            React.createElement("path", { d: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" })) }),
                    React.createElement("h3", null, "Kooperationen"),
                    React.createElement("p", null, "Wir suchen Marken, die zu dir passen, verhandeln die Konditionen und k\u00FCmmern uns um Vertr\u00E4ge und Deadlines. Du entscheidest, was du annimmst."),
                    React.createElement("div", { className: "bigline" }, "Marken, die zu dir passen")),
                React.createElement(Tile, null,
                    React.createElement(Icon, { d: React.createElement(React.Fragment, null,
                            React.createElement("path", { d: "M9 18h6" }),
                            React.createElement("path", { d: "M10 21h4" }),
                            React.createElement("path", { d: "M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" })) }),
                    React.createElement("h3", null, "Video-Ideen"),
                    React.createElement("p", null, "Formate, Hooks und Serien, abgestimmt auf deine Community.")),
                React.createElement(Tile, null,
                    React.createElement(Icon, { d: React.createElement(React.Fragment, null,
                            React.createElement("path", { d: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" }),
                            React.createElement("path", { d: "M14 3v6h6" }),
                            React.createElement("path", { d: "M8 13h8M8 17h5" })) }),
                    React.createElement("h3", null, "Impressum"),
                    React.createElement("p", null, "Rechtssicher unterwegs, ohne dass deine Privatadresse online steht.")),
                React.createElement(Tile, null,
                    React.createElement(Icon, { d: React.createElement(React.Fragment, null,
                            React.createElement("circle", { cx: "12", cy: "8", r: "4" }),
                            React.createElement("path", { d: "M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" })) }),
                    React.createElement("h3", null, "Management"),
                    React.createElement("p", null, "Planung, Anfragen, Termine. Eine feste Ansprechperson.")),
                React.createElement(Tile, null,
                    React.createElement(Icon, { d: React.createElement(React.Fragment, null,
                            React.createElement("circle", { cx: "12", cy: "12", r: "9" }),
                            React.createElement("path", { d: "M12 8v5" }),
                            React.createElement("path", { d: "M12 16h.01" })) }),
                    React.createElement("h3", null, "Hilfe bei Problemen"),
                    React.createElement("p", null, "Gesperrter Account, Shitstorm, \u00C4rger mit einer Marke: Wir sind da.")),
                React.createElement(Tile, { className: "wide" },
                    React.createElement(Icon, { d: React.createElement(React.Fragment, null,
                            React.createElement("circle", { cx: "12", cy: "12", r: "3" }),
                            React.createElement("path", { d: "M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4" })) }),
                    React.createElement("h3", null, "TikTok-LIVE-Zugang f\u00FCr jeden"),
                    React.createElement("p", null, "Auch mit kleiner Community. Wie das funktioniert und was es kostet, steht direkt darunter."))))));
}
function Live() {
    const reduce = useReducedMotion();
    return (React.createElement("section", { className: "live", id: "live" },
        React.createElement("div", { className: "wrap" },
            React.createElement("div", { className: "sechead" },
                React.createElement("span", { className: "livebadge" },
                    React.createElement(motion.i, { animate: reduce ? undefined : { scale: [1, 1.7, 1], opacity: [1, .4, 1] }, transition: { duration: 1.4, repeat: Infinity } }),
                    "LIVE"),
                React.createElement("h2", null, "TikTok Creator Network"),
                React.createElement("p", { className: "lede" }, "Geh heute noch live und verdiene auf TikTok Geld. \u00DCber unser Network bekommst du Zugang zu TikTok LIVE, auch wenn deine Community noch klein ist.")),
            React.createElement("div", { className: "livegrid" },
                React.createElement("div", { className: "facts" },
                    React.createElement("div", { className: "fact" },
                        React.createElement("b", null, "0\u00A0\u20AC"),
                        React.createElement("span", null, "Geb\u00FChren f\u00FCr Zugang und Betreuung")),
                    React.createElement("div", { className: "fact" },
                        React.createElement("b", null, "0\u00A0%"),
                        React.createElement("span", null, "Beteiligung an deinen LIVE-Einnahmen. 100\u00A0% bleiben bei dir.")),
                    React.createElement("div", { className: "fact" },
                        React.createElement("b", null, "Dein"),
                        React.createElement("span", null, "Content, deine Entscheidung. Wir reden mit, du bestimmst."))),
                React.createElement("div", { className: "howbox" },
                    React.createElement("h3", null, "Wie verdient One Gem Geld?"),
                    React.createElement("p", null, "Nur \u00FCber Markenkooperationen, die wir f\u00FCr dich vermitteln oder betreuen. Daf\u00FCr bekommen wir eine Provision, die wir vorher gemeinsam festlegen."),
                    React.createElement("p", null, "Keine Kooperation hei\u00DFt keine Provision. Deine LIVE-Einnahmen fassen wir nie an."),
                    React.createElement("p", { className: "note" }, "Aufnahme ins Network nach Pr\u00FCfung deines Accounts und vorbehaltlich der Freigabe durch TikTok. Es gelten die Auszahlungsbedingungen von TikTok."))))));
}
function Steps() {
    const s = [
        ["Kennenlernen", "Ein kurzes Gespräch: Wer bist du, was postest du, wo willst du hin?"],
        ["Account-Check", "Wir schauen uns deine Kanäle an und sagen dir ehrlich, was wir für dich tun können."],
        ["Loslegen", "LIVE-Zugang, erste Ideen und Marken-Pitches. Du hast ab Tag eins eine feste Ansprechperson."],
    ];
    return (React.createElement("section", null,
        React.createElement("div", { className: "wrap" },
            React.createElement("div", { className: "sechead" },
                React.createElement("h2", null, "So startest du")),
            React.createElement("div", { className: "steps" }, s.map(([h, p], i) => (React.createElement("div", { className: "step", key: h },
                React.createElement("span", { className: "n" },
                    "Schritt ",
                    i + 1),
                React.createElement("h3", null, h),
                React.createElement("p", null, p))))))));
}
function Beguna() {
    return (React.createElement("div", { className: "wrap", style: { paddingBottom: "clamp(64px,9vw,112px)" } },
        React.createElement("aside", { className: "hint", "aria-label": "Hinweis zu BeGuNa" },
            React.createElement("span", { className: "hintmark", "aria-hidden": "true" },
                React.createElement(GemMark, { size: 22 })),
            React.createElement("p", null,
                React.createElement("b", null, "\u00DCbrigens: BeGuNa ist auch von uns."),
                " Den Kanal \u201EGute Nachrichten f\u00FCr Berlin\u201C haben wir von null aufgebaut, von Konzept und Formaten bis zu Produktion und Ver\u00F6ffentlichung. In der Aufbauphase kam ein TikTok auf \u00FCber 41.000 Aufrufe, mehrere Instagram-Reels auf 4.000 bis 12.000, bei noch kleiner Community."))));
}
function Team() {
    return (React.createElement("section", { id: "team", style: { paddingTop: 0 } },
        React.createElement("div", { className: "wrap" },
            React.createElement("div", { className: "sechead" },
                React.createElement("h2", null, "Wer hinter One Gem steht")),
            React.createElement("div", { className: "team" },
                React.createElement("div", { className: "person" },
                    React.createElement("span", { className: "avatar", "aria-hidden": "true" }, "SK"),
                    React.createElement("div", null,
                        React.createElement("h3", null, "Sascha Krietsch"),
                        React.createElement("p", null, "Gesch\u00E4ftsf\u00FChrer und Gesellschafter. Dein Ansprechpartner f\u00FCr TikTok LIVE und Creator-Betreuung."))),
                React.createElement("div", { className: "person" },
                    React.createElement("span", { className: "avatar", "aria-hidden": "true" }, "FB"),
                    React.createElement("div", null,
                        React.createElement("h3", null, "Ferdinand Babila"),
                        React.createElement("p", null, "Gesellschafter. Dein Ansprechpartner f\u00FCr Creator, Kooperationen und Creator-Betreuung.")))))));
}
function CopyRow({ id, label, value }) {
    const [done, setDone] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setDone(true);
            setTimeout(() => setDone(false), 1800);
        }
        catch {
            const r = document.createRange();
            r.selectNodeContents(document.getElementById(id));
            const s = getSelection();
            s.removeAllRanges();
            s.addRange(r);
        }
    };
    return (React.createElement("div", { className: "mail" },
        React.createElement("div", null,
            React.createElement("small", null, label),
            React.createElement("code", { id: id }, value)),
        React.createElement(motion.button, { className: "btn sm", onClick: copy, whileTap: { scale: .95 }, "aria-live": "polite" }, done ? "Kopiert" : "Kopieren")));
}
const MAIL_TO = "sascha@one-gem.de";
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAwX75E8noN1JU2HBTAGyaUZ3i1twyX6HY",
    authDomain: "social-one-gem.firebaseapp.com",
    projectId: "social-one-gem",
    storageBucket: "social-one-gem.firebasestorage.app",
    messagingSenderId: "487709531500",
    appId: "1:487709531500:web:e8428a97914e09a1bc2749"
};
let fbDb = null;
function getDb() {
    if (fbDb)
        return fbDb;
    if (!window.firebase || !window.firebase.firestore)
        throw new Error("firebase-missing");
    if (!window.firebase.apps.length)
        window.firebase.initializeApp(FIREBASE_CONFIG);
    fbDb = window.firebase.firestore();
    return fbDb;
}
async function saveApplication(v) {
    const db = getDb();
    const task = db.collection("applications").add({
        name: v.name.trim(),
        handle: v.handle.trim().replace(/^@/, ""),
        age: parseInt(v.age, 10),
        city: v.city.trim(),
        about: v.about.trim(),
        consent: true,
        status: "neu",
        createdAt: window.firebase.firestore.FieldValue.serverTimestamp()
    });
    const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 12000));
    return Promise.race([task, timeout]);
}
function Field({ id, label, hint, error, children }) {
    return (React.createElement("div", { className: "field" + (error ? " has-error" : "") },
        React.createElement("label", { htmlFor: id }, label),
        children,
        error ? React.createElement("p", { className: "ferr", id: id + "-err", role: "alert" }, error) : hint ? React.createElement("p", { className: "fhint", id: id + "-hint" }, hint) : null));
}
function Apply() {
    const empty = { name: "", handle: "", age: "", city: "", about: "", consent: false };
    const [f, setF] = useState(empty);
    const [err, setErr] = useState({});
    const [sent, setSent] = useState(null);
    const [busy, setBusy] = useState(false);
    const [copied, setCopied] = useState(false);
    const set = k => e => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
    const check = v => {
        const e = {};
        if (v.name.trim().length < 2)
            e.name = "Bitte gib deinen Namen ein.";
        const h = v.handle.trim().replace(/^@/, "");
        if (!h)
            e.handle = "Bitte gib deinen Account-Namen ein.";
        else if (!/^[A-Za-z0-9._]{2,30}$/.test(h))
            e.handle = "Nur Buchstaben, Zahlen, Punkt und Unterstrich, 2 bis 30 Zeichen.";
        const a = parseInt(v.age, 10);
        if (!v.age)
            e.age = "Bitte gib dein Alter an.";
        else if (isNaN(a) || a < 1 || a > 99)
            e.age = "Bitte gib ein gültiges Alter an.";
        else if (a < 18)
            e.age = "TikTok LIVE mit Einnahmen geht erst ab 18. Meld dich gern wieder, wenn du 18 bist.";
        if (!v.city.trim())
            e.city = "Bitte gib deinen Ort an.";
        if (!v.consent)
            e.consent = "Bitte bestätige, dass wir deine Angaben für die Bewerbung nutzen dürfen.";
        return e;
    };
    const text = v => [
        "Bewerbung TikTok Creator Network",
        "",
        "Name: " + v.name.trim(),
        "Account: @" + v.handle.trim().replace(/^@/, ""),
        "Alter: " + v.age,
        "Ort: " + v.city.trim(),
        "",
        "Über mich:",
        v.about.trim() || "(keine Angabe)",
    ].join("\n");
    const submit = async (e) => {
        e.preventDefault();
        if (busy)
            return;
        const er = check(f);
        setErr(er);
        if (Object.keys(er).length) {
            const first = document.getElementById("ap-" + Object.keys(er)[0]);
            if (first)
                first.focus();
            return;
        }
        const body = text(f);
        setBusy(true);
        try {
            await saveApplication(f);
            setSent({ ok: true, body });
        }
        catch (error) {
            console.error(error);
            const subject = "Bewerbung: @" + f.handle.trim().replace(/^@/, "");
            setSent({ ok: false, body });
            window.location.href = "mailto:" + MAIL_TO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        }
        finally {
            setBusy(false);
        }
    };
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(sent.body);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        }
        catch {
            const r = document.createRange();
            r.selectNodeContents(document.getElementById("ap-summary"));
            const s = getSelection();
            s.removeAllRanges();
            s.addRange(r);
        }
    };
    const describe = k => err[k] ? "ap-" + k + "-err" : undefined;
    return (React.createElement("section", { id: "bewerben", className: "applysec" },
        React.createElement("div", { className: "wrap applygrid" },
            React.createElement("div", { className: "sechead", style: { marginBottom: 0 } },
                React.createElement("h2", null, "Bewirb dich"),
                React.createElement("p", { className: "lede" }, "Erz\u00E4hl uns kurz, wer du bist und wo wir dich finden. Wir schauen uns deinen Account an und melden uns innerhalb von zwei Werktagen."),
                React.createElement("ul", { className: "reqs" },
                    React.createElement("li", null, "Mindestens 18 Jahre alt"),
                    React.createElement("li", null, "Eigener TikTok-Account, Gr\u00F6\u00DFe egal"),
                    React.createElement("li", null, "Keine Geb\u00FChren, keine Beteiligung an deinen LIVE-Einnahmen"))),
            sent && sent.ok ? (React.createElement(motion.div, { className: "applycard done", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, role: "status" },
                React.createElement("h3", null, "Bewerbung ist da"),
                React.createElement("p", null,
                    "Danke, ",
                    f.name.trim().split(" ")[0],
                    ". Wir schauen uns ",
                    React.createElement("b", null,
                        "@",
                        f.handle.trim().replace(/^@/, "")),
                    " an und melden uns innerhalb von zwei Werktagen bei dir."),
                React.createElement("p", null, "Bis dahin: einfach weiter posten."))) : sent ? (React.createElement(motion.div, { className: "applycard done", initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, role: "status" },
                React.createElement("h3", null, "Fast geschafft"),
                React.createElement("p", null, "Dein E-Mail-Programm hat sich mit deiner Bewerbung ge\u00F6ffnet. Schick die Mail ab, dann ist sie bei uns."),
                React.createElement("p", null,
                    "Hat sich nichts ge\u00F6ffnet? Kopier deine Bewerbung und schick sie an ",
                    React.createElement("b", null, MAIL_TO),
                    "."),
                React.createElement("pre", { id: "ap-summary", className: "summary" }, sent.body),
                React.createElement("div", { className: "ctas", style: { marginTop: 0 } },
                    React.createElement("button", { type: "button", className: "btn gem sm", onClick: copy }, copied ? "Kopiert" : "Bewerbung kopieren"),
                    React.createElement("button", { type: "button", className: "btn sm", onClick: () => { setSent(null); } }, "Angaben \u00E4ndern")))) : (React.createElement("form", { className: "applycard", onSubmit: submit, noValidate: true },
                React.createElement(Field, { id: "ap-name", label: "Wer bist du?", error: err.name },
                    React.createElement("input", { id: "ap-name", name: "name", type: "text", maxLength: "100", autoComplete: "name", placeholder: "Vor- und Nachname", value: f.name, onChange: set("name"), "aria-invalid": !!err.name, "aria-describedby": describe("name") })),
                React.createElement(Field, { id: "ap-handle", label: "TikTok-Account", hint: "So wie er in deinem Profil steht", error: err.handle },
                    React.createElement("div", { className: "prefix" },
                        React.createElement("span", { "aria-hidden": "true" }, "@"),
                        React.createElement("input", { id: "ap-handle", name: "handle", type: "text", autoComplete: "off", autoCapitalize: "off", spellCheck: "false", placeholder: "deinname", value: f.handle, onChange: set("handle"), "aria-invalid": !!err.handle, "aria-describedby": describe("handle") || "ap-handle-hint" }))),
                React.createElement("div", { className: "row2" },
                    React.createElement(Field, { id: "ap-age", label: "Alter", error: err.age },
                        React.createElement("input", { id: "ap-age", name: "age", type: "number", inputMode: "numeric", min: "18", max: "99", placeholder: "z. B. 24", value: f.age, onChange: set("age"), "aria-invalid": !!err.age, "aria-describedby": describe("age") })),
                    React.createElement(Field, { id: "ap-city", label: "Ort", error: err.city },
                        React.createElement("input", { id: "ap-city", name: "city", type: "text", maxLength: "100", autoComplete: "address-level2", placeholder: "z. B. Berlin", value: f.city, onChange: set("city"), "aria-invalid": !!err.city, "aria-describedby": describe("city") }))),
                React.createElement(Field, { id: "ap-about", label: "\u00DCber dich (optional)", hint: "Was postest du, was willst du auf TikTok erreichen?" },
                    React.createElement("textarea", { id: "ap-about", name: "about", rows: "4", maxLength: "2000", value: f.about, onChange: set("about"), "aria-describedby": "ap-about-hint" })),
                React.createElement("div", { className: "consent" + (err.consent ? " has-error" : "") },
                    React.createElement("input", { id: "ap-consent", type: "checkbox", checked: f.consent, onChange: set("consent"), "aria-invalid": !!err.consent, "aria-describedby": describe("consent") }),
                    React.createElement("label", { htmlFor: "ap-consent" },
                        "Ich bin einverstanden, dass One Gem meine Angaben zur Bearbeitung meiner Bewerbung nutzt. Mehr dazu in der ",
                        React.createElement("a", { href: "datenschutz.html" }, "Datenschutzerkl\u00E4rung"),
                        ".")),
                err.consent && React.createElement("p", { className: "ferr", id: "ap-consent-err", role: "alert" }, err.consent),
                React.createElement(motion.button, { type: "submit", className: "btn gem", whileTap: { scale: .97 }, disabled: busy }, busy ? "Wird gesendet …" : "Bewerbung absenden"))))));
}
function Contact() {
    return (React.createElement("section", { id: "kontakt" },
        React.createElement("div", { className: "wrap" },
            React.createElement("div", { className: "contact" },
                React.createElement("div", { style: { position: "relative" } },
                    React.createElement("h2", null, "Lass uns reden"),
                    React.createElement("p", { className: "lede", style: { marginTop: 18 } }, "Schreib uns kurz, wer du bist und wo man dich findet. Wir melden uns innerhalb von zwei Werktagen.")),
                React.createElement("div", { className: "mails" },
                    React.createElement(CopyRow, { id: "m1", label: "Sascha \u00B7 TikTok LIVE & Creator-Betreuung", value: "sascha@one-gem.de" }),
                    React.createElement(CopyRow, { id: "m2", label: "Ferdinand \u00B7 Creator, Kooperationen & Creator-Betreuung", value: "ferdinand.babila@one-gem.de" }))))));
}
function App() {
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { className: "nav", "aria-label": "Hauptnavigation" },
            React.createElement("div", { className: "wrap" },
                React.createElement("a", { className: "brand", href: "#top" },
                    React.createElement(GemMark, null),
                    "ONE GEM"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("a", { href: "#creator" }, "F\u00FCr Creator")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#live" }, "TikTok LIVE")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#bewerben" }, "Bewerben")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#team" }, "Team"))),
                React.createElement("a", { className: "btn gem sm", href: "#bewerben" }, "Bewerben"))),
        React.createElement(Hero, null),
        React.createElement(Marquee, null),
        React.createElement(Services, null),
        React.createElement(Live, null),
        React.createElement(Steps, null),
        React.createElement(Apply, null),
        React.createElement(Beguna, null),
        React.createElement(Team, null),
        React.createElement(Contact, null),
        React.createElement("footer", null,
            React.createElement("div", { className: "wrap" },
                React.createElement("address", null,
                    "One Gem UG (haftungsbeschr\u00E4nkt)",
                    React.createElement("br", null),
                    "Kemperplatz 1, 10785 Berlin",
                    React.createElement("br", null),
                    "Sitz Fulda, Amtsgericht Fulda HRB 9308",
                    React.createElement("br", null),
                    "USt-IdNr. DE463178204, Gesch\u00E4ftsf\u00FChrer Sascha Krietsch"),
                React.createElement("nav", { "aria-label": "Rechtliches" },
                    React.createElement("a", { href: "impressum.html" }, "Impressum"),
                    React.createElement("a", { href: "datenschutz.html" }, "Datenschutz"))))));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
