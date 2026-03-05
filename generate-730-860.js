/**
 * vocabulary730 (TSL 501-750) と vocabulary860 (TSL 751-1000) を各250語に拡張
 * wordList.js の該当セクションを上書きする
 */
const fs = require('fs');
const path = require('path');

function entry(no, en, ja, romaji, pos) {
  return '    { no: ' + no + ', en: "' + en + '", ja: "' + ja + '", romaji: "' + romaji + '", pos: "' + pos + '" }';
}

// TSL 501-750: 250語 [en, ja, romaji, pos]
const V730 = [
  ["abolish","はいしする","haishi suru","動詞"],["absorb","きゅうしゅうする","kyuushuu suru","動詞"],["abstract","ちゅうしょうてきな","chuushouteki na","形容詞"],
  ["accelerate","かそくする","kasoku suru","動詞"],["accommodate","うけいれる","ukeireru","動詞"],["accompany","つれそう","tsuresou","動詞"],
  ["accomplish","なしとげる","nashitogeru","動詞"],["acknowledge","みとめる","mitomeru","動詞"],["acquire","えたえる","etaeru","動詞"],
  ["adapt","てきおうする","tekiou suru","動詞"],["adhere","したがう","shitagau","動詞"],["adjust","ちょうせいする","chousei suru","動詞"],
  ["administer","かんりする","kanri suru","動詞"],["advocate","となえる","tonaeru","動詞"],["affect","えいきょうする","eikyou suru","動詞"],
  ["affiliate","しゅうせきする","shuuseki suru","動詞"],["afford","よゆうがある","yoyuu ga aru","動詞"],["aggregate","しゅうごうする","shuugou suru","動詞"],
  ["allocate","わりあてる","wariateru","動詞"],["amend","しゅうせいする","shuusei suru","動詞"],["analogy","るいれい","ruirei","名詞"],
  ["analyze","ぶんせきする","bunseki suru","動詞"],["announce","せいめいする","seimei suru","動詞"],["apparent","めいらかな","meiraka na","形容詞"],
  ["appoint","にんめいする","ninmei suru","動詞"],["appraise","ひょうかする","hyouka suru","動詞"],["approximate","およその","oyoso no","形容詞"],
  ["arbitrary","きまぐれな","kimagure na","形容詞"],["articulate","めいりょうにのべる","meiryou ni noberu","動詞"],["ascertain","かくにんする","kakunin suru","動詞"],
  ["assemble","あつめる","atsumeru","動詞"],["assess","ひょうかする","hyouka suru","動詞"],["assure","ほあんする","hoan suru","動詞"],
  ["attain","たっする","tassuru","動詞"],["attribute","きせいする","kisei suru","動詞"],["auxiliary","ほじょの","hojo no","形容詞"],
  ["avail","りようする","riyou suru","動詞"],["avert","さける","sakeru","動詞"],["award","じゅしょう","jushou","名詞"],
  ["barrier","しょうがい","shougai","名詞"],["baseline","きじゅんせん","kijunsen","名詞"],["bear","おう","ou","動詞"],
  ["behalf","ために","tame ni","名詞"],["benchmark","ひょうじゅん","hyoujun","名詞"],["bind","しばる","shibaru","動詞"],
  ["bond","きんこう","kinkou","名詞"],["bonus","ぼーなす","boonasu","名詞"],["boost","つよめる","tsuyomeru","動詞"],
  ["border","きょうかい","kyoukai","名詞"],["borrow","かりる","kariru","動詞"],["bound","けいやく","keiyaku","名詞"],
  ["breach","いはん","ihan","名詞"],["broadcast","ほうそうする","housou suru","動詞"],["bulk","かさ","kasa","名詞"],
  ["burden","ふたん","futan","名詞"],["bypass","ばいぱす","baipasu","名詞"],["cable","けーぶる","keeburu","名詞"],
  ["calculate","けいさんする","keisan suru","動詞"],["cancel","とりけす","torikesu","動詞"],["capability","のうりょく","nouryoku","名詞"],
  ["capture","ほかくする","hokaku suru","動詞"],["carry","はこぶ","hakobu","動詞"],["cast","とうひょう","touhyou","名詞"],
  ["catalog","かたろぐ","katarogu","名詞"],["category","ぶるい","burui","名詞"],["cease","やめる","yameru","動詞"],
  ["central","ちゅうおうの","chuuo no","形容詞"],["certificate","しょうめいしょ","shoumeisho","名詞"],["challenge","ちょうせん","chousen","名詞"],
  ["channel","ちゃんねる","channeru","名詞"],["character","せいかく","seikaku","名詞"],["chart","ずひょう","zuhyou","名詞"],
  ["chase","おいかける","oikakeru","動詞"],["cite","いんようする","in'you suru","動詞"],["clause","こうかん","koukan","名詞"],
  ["clear","めいりょうな","meiryou na","形容詞"],["climate","ふんいき","funiki","名詞"],["collapse","ほうかいする","houkai suru","動詞"],
  ["collect","あつめる","atsumeru","動詞"],["compact","こんぱくとな","konpakuto na","形容詞"],["complement","ほきょうする","hokyou suru","動詞"],
  ["compose","そうせいする","sousei suru","動詞"],["comprehensive","そうごうてきな","sougouteki na","形容詞"],["comprise","ふくむ","fukumu","動詞"],
  ["compromise","だきょうする","dakyou suru","動詞"],["compute","けいさんする","keisan suru","動詞"],["conceive","かんがえだす","kangaedasu","動詞"],
  ["concentrate","しゅうちゅうする","chuuchuu suru","動詞"],["confer","あたえる","ataeru","動詞"],["confine","かぎる","kagiru","動詞"],
  ["conform","したがう","shitagau","動詞"],["constitute","こうせいする","kousei suru","動詞"],["constrain","せいげんする","seigen suru","動詞"],
  ["construct","けんせつする","kensetsu suru","動詞"],["consult","そうだんする","soudan suru","動詞"],["consume","しょうひする","shouhi suru","動詞"],
  ["contend","あらそう","arasou","動詞"],["contradict","むじゅんする","mujun suru","動詞"],["convene","しゅうごうする","shuugou suru","動詞"],
  ["convince","なっとくさせる","nattoku saseru","動詞"],["core","かく","kaku","名詞"],["correct","ただしい","tadashii","形容詞"],
  ["counsel","じょげんする","jogen suru","動詞"],["crucial","じゅうような","juuyou na","形容詞"],["currency","つうか","tsuuka","名詞"],
  ["curve","きょくせん","kyokussen","名詞"],["cycle","さいくる","saikuru","名詞"],["defect","けってん","ketten","名詞"],
  ["defend","まもる","mamoru","動詞"],["define","ていぎする","teigi suru","動詞"],["delete","さくじょする","sakujo suru","動詞"],
  ["deliberate","しんしゃくする","shinshaku suru","動詞"],["denote","しめす","shimesu","動詞"],["deny","ひていする","hitei suru","動詞"],
  ["depart","しゅっぱつする","shuppatsu suru","動詞"],["deposit","よきんする","yokin suru","動詞"],["derive","えだす","edasu","動詞"],
  ["describe","きじゅつする","kijutsu suru","動詞"],["designate","していする","shitei suru","動詞"],["desire","のぞむ","nozomu","動詞"],
  ["detect","けんしゅつする","kenshutsu suru","動詞"],["determine","きめる","kimeru","動詞"],["device","そうち","souchi","名詞"],
  ["devote","ささげる","sasageru","動詞"],["differ","ことなる","kotonaru","動詞"],["dimension","じげん","jigen","名詞"],
  ["diminish","へらす","herasu","動詞"],["disable","むのうにする","munou ni suru","動詞"],["disagree","いこうする","ikou suru","動詞"],
  ["disclose","あきらかにする","akiraka ni suru","動詞"],["discriminate","くべつする","kubetsu suru","動詞"],["dismiss","かいこする","kaiko suru","動詞"],
  ["dispose","しょりする","shori suru","動詞"],["dispute","ぎろん","giron","名詞"],["distinct","めいりょうな","meiryou na","形容詞"],
  ["distinguish","くべつする","kubetsu suru","動詞"],["diverse","たような","tayou na","形容詞"],["dominate","しはいする","shihai suru","動詞"],
  ["duration","きかん","kikan","名詞"],["dynamic","どうてきな","douteki na","形容詞"],["earn","かせぐ","kasegu","動詞"],
  ["edit","へんしゅうする","henshuu suru","動詞"],["eliminate","のぞく","nozoku","動詞"],["emerge","あらわれる","arawareru","動詞"],
  ["emphasis","きょうちょう","kyouchou","名詞"],["employ","こようする","koyou suru","動詞"],["enact","せいていする","seitei suru","動詞"],
  ["encounter","であう","deau","動詞"],["enforce","きょうせいする","kyousei suru","動詞"],["entitle","けんりをあたえる","kenri wo ataeru","動詞"],
  ["equivalent","とうどうの","toudou no","形容詞"],["essential","ひつような","hitsuyou na","形容詞"],["ethic","りんり","rinri","名詞"],
  ["evolve","しんかする","shinka suru","動詞"],["exempt","めんじょする","menjo suru","動詞"],["expend","ついやす","tsuiyasu","動詞"],
  ["explicit","めいかくな","meikaku na","形容詞"],["exploit","りようする","riyou suru","動詞"],["export","ゆしゅつする","yushutsu suru","動詞"],
  ["expose","さらす","sarasu","動詞"],["facilitate","じゅんちょうにする","junchou ni suru","動詞"],["finite","ゆうげんな","yuugen na","形容詞"],
  ["flexible","じゅうなんな","juunan na","形容詞"],["fulfill","じっげんする","jissen suru","動詞"],["furnish","そなえる","sonaeru","動詞"],
  ["further","さらに","sara ni","副詞"],["gap","ぎゃっぷ","gyappu","名詞"],["generate","せいせいする","seisei suru","動詞"],
  ["global","ぐろーばるな","guroobaruna","形容詞"],["govern","とりしまる","torishimaru","動詞"],["heading","みだし","midashi","名詞"],
  ["hypothesis","かせつ","kasetsu","名詞"],["illustrate","せつめいする","setsumei suru","動詞"],["inherit","けいしょうする","keishou suru","動詞"],
  ["innovate","かくしんする","kakushin suru","動詞"],["integral","ひつような","hitsuyou na","形容詞"],["integrity","せいじゅん","seijun","名詞"],
  ["interval","かんかく","kankaku","名詞"],["intrinsic","ほんらいの","honrai no","形容詞"],["invoke","ひきだす","hikidasu","動詞"],
  ["isolate","こりつさせる","koritsu saseru","動詞"],["layer","そう","sou","名詞"],["legal","ほうりつてきな","houritsuteki na","形容詞"],
  ["legislate","りっぽうする","rippou suru","動詞"],["levy","かぜいする","kazei suru","動詞"],["liability","せきにん","sekinin","名詞"],
  ["logic","ろんり","ronri","名詞"],["mandate","めんていする","mentei suru","動詞"],["mature","せいじゅくする","seijuku suru","動詞"],
  ["maximize","さいだいかする","saidai ka suru","動詞"],["mediate","ちゅうかいする","chuukai suru","動詞"],["medium","ばい","bai","名詞"],
  ["mention","言及する","genkyuu suru","動詞"],["merge","がっぺいする","gappei suru","動詞"],["motive","どうき","douki","名詞"],
  ["nominate","ていめいする","teimei suru","動詞"],["norm","きじゅん","kijun","名詞"],["oblige","きょうせいする","kyousei suru","動詞"],
  ["occupy","せんきょする","senkyo suru","動詞"],["occur","おこる","okoru","動詞"],["offset","おふせっと","ofusetto","名詞"],
  ["organ","きかん","kikan","名詞"],["orient","むける","mukeru","動詞"],["overall","ぜんたいの","zentai no","形容詞"],
  ["overlap","ちょうふく","choufuku","名詞"],["pace","ぺーす","peesu","名詞"],["package","ぱっけーじ","pakkeiji","名詞"],
  ["panel","ぱねる","paneru","名詞"],["parallel","へいこうの","heikou no","形容詞"],["parameter","ぱらめーた","parameta","名詞"],
  ["patent","とっきょ","tokkyo","名詞"],["pattern","ぱたーん","pataan","名詞"],["pause","いちじていし","ichiji teishi","名詞"],
  ["peak","ちょうてん","chouten","名詞"],["penalize","ばっする","bassuru","動詞"],["perceive","ちかくする","chikaku suru","動詞"],
  ["perfect","かんぺきな","kanpeki na","形容詞"],["perform","おこなう","okonau","動詞"],["permit","ゆるす","yurusu","動詞"],
  ["persist","しつづける","shitsuzukeru","動詞"],["phase","だんかい","dankai","名詞"],["place","おく","oku","動詞"],
  ["plus","ぷらす","purasu","名詞"],["point","てん","ten","名詞"],["portion","ぶぶん","bubun","名詞"],
  ["pose","もたらす","motarasu","動詞"],["positive","せいめいてきな","seimeiteki na","形容詞"],["possess","もつ","motsu","動詞"],
  ["postpone","えんきする","enki suru","動詞"],["potential","かのうせい","kanousei","名詞"],["precede","さきだつ","sakidatsu","動詞"],
  ["precise","せいみつな","seimitsu na","形容詞"],["predict","よそくする","yosoku suru","動詞"],["prefer","このむ","konomu","動詞"],
  ["prescribe","しほうする","shihou suru","動詞"],["preserve","ほぞんする","hozon suru","動詞"],["press","おす","osu","動詞"],
  ["prevent","ふせぐ","fusegu","動詞"],["prime","しゅような","shuyou na","形容詞"],["principal","しゅような","shuyou na","形容詞"],
  ["principle","げんそく","gensoku","名詞"],["prior","さきの","saki no","形容詞"],["privilege","とくけん","tokuken","名詞"],
  ["proceed","つづける","tsuzukeru","動詞"],["profile","ぷろふぃーる","purofiiru","名詞"],["proportion","ひれい","hirei","名詞"],
  ["prospect","みこみ","mikomi","名詞"],["protect","ほごする","hogo suru","動詞"],["protocol","ぎょうれつ","gyouretsu","名詞"],
  ["publish","はっぴょうする","happyou suru","動詞"],["pursue","ついきゅうする","tsuikyuu suru","動詞"],["qualify","しかくをえる","shikaku wo eru","動詞"],
  ["quote","ひょうじする","hyouji suru","動詞"],["rank","らんく","ranku","名詞"],["rational","ごうりてきな","gouriteki na","形容詞"],
  ["reach","たっする","tassuru","動詞"],["react","はんのうする","hannou suru","動詞"],["recall","おもいだす","omoidasu","動詞"],
  ["recover","かいふくする","kaifuku suru","動詞"],["reform","かいかくする","kaikaku suru","動詞"],["refund","へいきん","heikin","名詞"],
  ["regard","みなす","minasu","動詞"],["register","とうろくする","touroku suru","動詞"],["regulate","きせいする","kisei suru","動詞"],
  ["reinforce","きょうかする","kyouka suru","動詞"],["reject","きょぜつする","kyozetsu suru","動詞"],["relate","かんけいづける","kankei zukeru","動詞"],
  ["relevant","かんれんする","kanren suru","形容詞"],["relieve","らくにする","raku ni suru","動詞"],["rely","たよる","tayoru","動詞"],
  ["render","あたえる","ataeru","動詞"],["renew","あらたにする","arata ni suru","動詞"],["replace","おきかえる","okikaeru","動詞"],
  ["reserve","よやくする","yoyaku suru","動詞"],["resolve","かいけつする","kaiketsu suru","動詞"],["respond","へんじする","henji suru","動詞"],
  ["restore","かいふくする","kaifuku suru","動詞"],["restrict","せいげんする","seigen suru","動詞"],["retain","ほじする","hoji suru","動詞"],
  ["reveal","あきらかにする","akiraka ni suru","動詞"],["revise","しゅうせいする","shuusei suru","動詞"],["reward","ほうしゅう","houshuu","名詞"],
  ["route","るーと","ruuto","名詞"],["safeguard","ほご","hogo","名詞"],["scheme","けいかく","keikaku","名詞"],
  ["secure","あんぜんにする","anzen ni suru","動詞"],["seek","もとめる","motomeru","動詞"],["sell","うる","uru","動詞"],
  ["sequence","じゅんじょ","junjo","名詞"],["serve","つかえる","tsukaeru","動詞"],["settle","けっさいする","kessai suru","動詞"],
  ["show","しめす","shimesu","動詞"],["sign","さいんする","sain suru","動詞"],["simplify","かんたんにする","kantan ni suru","動詞"],
  ["simulate","しみゅれーとする","shimyureeto suru","動詞"],["site","さいと","saito","名詞"],["solve","かいけつする","kaiketsu suru","動詞"],
  ["split","わける","wakeru","動詞"],["sponsor","すぽんさー","suponsaa","名詞"],["spot","ばしょ","basho","名詞"],
  ["spread","ひろがる","hirogaru","動詞"],["stability","あんていせい","anteisei","名詞"],["state","じょうたい","joutai","名詞"],
  ["stay","とどまる","todomaru","動詞"],["stick","くっつく","kuttsuku","動詞"],["stimulus","しげき","shigeki","名詞"],
  ["stream","すとりーむ","sutoriiimu","名詞"],["strength","ちから","chikara","名詞"],["stress","すとれす","sutoresu","名詞"],
  ["strict","きびしい","kibishii","形容詞"],["style","すたいる","sutairu","名詞"],["submit","ていしゅつする","teishutsu suru","動詞"],
  ["subsequent","そのごの","sono go no","形容詞"],["substitute","だいようする","daiyou suru","動詞"],["succeed","せいこうする","seikou suru","動詞"],
  ["sufficient","じゅうぶんな","juubun na","形容詞"],["suit","てきする","teki suru","動詞"],["sum","ごうけい","goukei","名詞"],
  ["summary","ようやく","youyaku","名詞"],["supply","きょうきゅうする","kyoukyuu suru","動詞"],["suppose","おもう","omou","動詞"],
  ["survey","ちょうさする","chousa suru","動詞"],["suspend","ちゅうしする","chuushi suru","動詞"],["sustain","ささえる","sasaeru","動詞"],
  ["symbol","しんぼる","shinboru","名詞"],["symptom","しょうじょう","shoujou","名詞"],["tackle","とりくむ","torikumu","動詞"],
  ["technical","ぎじゅつてきな","gijutsuteki na","形容詞"],["temporary","いちじの","ichiji no","形容詞"],["tend","けいこうがある","keikou ga aru","動詞"],
  ["terminate","しゅうりょうする","shuuryou suru","動詞"],["theory","りろん","riron","名詞"],["thereby","それによって","sore ni yotte","副詞"],
  ["thorough","しんにゅうした","shinnyuu shita","形容詞"],["threshold","いきち","ikichi","名詞"],["tight","きつい","kitsui","形容詞"],
  ["title","たいとる","taitoru","名詞"],["tone","とーん","toon","名詞"],["trace","あと","ato","名詞"],
  ["track","とらっく","torakku","名詞"],["tradition","でんとう","dentou","名詞"],["transform","へんかんする","henkan suru","動詞"],
  ["transmit","でんそうする","densou suru","動詞"],["transport","ゆそうする","yusou suru","動詞"],["trigger","ひきがね","hikigane","名詞"],
  ["turn","まわる","mawaru","動詞"],["ultimate","さいごの","saigo no","形容詞"],["undergo","うける","ukeru","動詞"],
  ["underline","かきせんをひく","kikisen wo hiku","動詞"],["undertake","ひきうける","hikiukeru","動詞"],["uniform","いつような","itsuyou na","形容詞"],
  ["unique","ゆにーくな","yuniiku na","形容詞"],["unite","がっこうする","gakkou suru","動詞"],["universal","ふへんの","fuhen no","形容詞"],
  ["update","こうしんする","koushin suru","動詞"],["upgrade","あっぷぐれーどする","appugureedo suru","動詞"],["urge","うながす","unagasu","動詞"],
  ["usual","いつもの","itsumo no","形容詞"],["valid","ゆうこうな","yuukou na","形容詞"],["variable","へんすう","hensuu","名詞"],
  ["vary","かわる","kawaru","動詞"],["vehicle","のりもの","norimono","名詞"],["venture","べんちゃー","benchaa","名詞"],
  ["versus","たい","tai","前置詞"],["via","をとおして","wo tooshite","前置詞"],["viable","じっこうかのうな","jikkou kanou na","形容詞"],
  ["violate","いはんする","ihan suru","動詞"],["virtual","ばーちゃるな","baacharuna","形容詞"],["visible","みえる","mieru","形容詞"],
  ["vision","びじょん","bijon","名詞"],["visual","しかくの","shikaku no","形容詞"],["voluntary","じしゅてきな","jishuteki na","形容詞"],
  ["vote","とうひょうする","touhyou suru","動詞"],["wage","ちんぎん","chingin","名詞"],["warrant","しょうこ","shouko","名詞"],
  ["way","ほうほう","houhou","名詞"],["weigh","おもさをはかる","omosa wo hakaru","動詞"],["welfare","ふくし","fukushi","名詞"],
  ["wide","ひろい","hiroi","形容詞"],["withdraw","ひきあげる","hikiageru","動詞"],["witness","もくげきする","mokugeki suru","動詞"],
  ["worth","かち","kachi","名詞"],["wrap","つつむ","tsutsumu","動詞"],["write","かく","kaku","動詞"],
  ["zone","ぞーん","zoon","名詞"]
];

// TSL 751-1000: 250語 [en, ja, romaji, pos]（V730と重複なし）
const V860 = [
  ["accomplishment","せいせき","seiseki","名詞"],["administrative","ぎょうむの","gyoumu no","形容詞"],["authorize","けんきをあたえる","kenki wo ataeru","動詞"],
  ["automate","じどうかする","jidouka suru","動詞"],["compliance","じゅんしゅ","junshu","名詞"],["confidential","きみつの","kimitsu no","形容詞"],
  ["consolidate","とうごうする","tougou suru","動詞"],["coordinate","とりまとめる","torimatomeru","動詞"],["delegate","いにんする","inin suru","動詞"],
  ["demonstrate","じっこうしてしめす","jikkou shite shimesu","動詞"],["documentation","しょるいか","shorui ka","名詞"],["eligible","しかくのある","shikaku no aru","形容詞"],
  ["establish","せつりつする","setsuritsu suru","動詞"],["expertise","せんもんちしき","senmon chishiki","名詞"],["formalize","けいしきかする","keishikika suru","動詞"],
  ["implement","じっしする","jisshi suru","動詞"],["incentive","しどうきん","shidoukin","名詞"],["infrastructure","きそしせつ","kiso shisetsu","名詞"],
  ["innovative","かくしんてきな","kakushinteki na","形容詞"],["liaison","れんらくやく","renrakuyaku","名詞"],["maintenance","ほぜん","hozen","名詞"],
  ["mandatory","ひっすの","hissu no","形容詞"],["optimize","さいてきかする","saiteki ka suru","動詞"],["prioritize","ゆうせんじゅんいをつける","yuusen jun'i wo tsukeru","動詞"],
  ["procedural","てつづきの","tetsuzuki no","形容詞"],["qualification","しかく","shikaku","名詞"],["redundant","じゅうふくな","juufuku na","形容詞"],
  ["regulatory","きせいの","kisei no","形容詞"],["streamline","こうりゅうかする","kouryuuka suru","動詞"],["supervisor","かんとくしゃ","kantokusha","名詞"],
  ["acquisition","かくとく","kakutoku","名詞"],["arbitration","ちゅうさい","chuusai","名詞"],["benchmarking","べんちまーきんぐ","benchimakingu","名詞"],
  ["bottleneck","ぼるねっく","borunekku","名詞"],["breakthrough","だいほっとす","daihottosu","名詞"],["consensus","ごうい","goui","名詞"],
  ["contingency","よき","yoki","名詞"],["cost-effective","こすとこうかがたかい","kosuto kouka ga takai","形容詞"],["counterpart","たいおうしゃ","taiousha","名詞"],
  ["deadline","しめきり","shimekiri","名詞"],["discrepancy","そうい","soui","名詞"],["feasibility","かのうせい","kanousei","名詞"],
  ["fluctuation","へんどう","hendou","名詞"],["guideline","ししん","shishin","名詞"],["in-house","しゃないの","shanai no","形容詞"],
  ["initiative","しゅどうけん","shudouken","名詞"],["leverage","りようする","riyou suru","動詞"],["milestone","まいろすとーん","mairo sutoun","名詞"],
  ["outsource","がいちゅうする","gaichuu suru","動詞"],["oversee","かんとくする","kantoku suru","動詞"],["proactive","ぜんちてきな","zenchiteki na","形容詞"],
  ["redundancy","じゅうふく","juufuku","名詞"],["stakeholder","かんけいしゃ","kankeisha","名詞"],["sustainable","じぞくかのうな","jizoku kanou na","形容詞"],
  ["turnover","じんいんりゅうどう","jin'in ryuudou","名詞"],["accountability","せきにん","sekinin","名詞"],["brainstorm","ぶれいんすとーむする","bureinsutoumu suru","動詞"],
  ["consecutive","れんぞくの","renzoku no","形容詞"],["contingent","じょうけんつきの","jouken tsuki no","形容詞"],["downsize","せいじんする","seijin suru","動詞"],
  ["empower","けんのうをあたえる","kennou wo ataeru","動詞"],["expedite","すみやかにする","sumiyaka ni suru","動詞"],["fluctuate","へんどうする","hendou suru","動詞"],
  ["forecast","よそくする","yosoku suru","動詞"],["holistic","ぜんめんてきな","zenmenteki na","形容詞"],["incur","こうむる","koumuru","動詞"],
  ["interim","ちゅうかんの","chuukan no","形容詞"],["liaise","れんらくする","renraku suru","動詞"],["merger","がっぺい","gappei","名詞"],
  ["multinational","たこくの","takoku no","形容詞"],["overhaul","ぜんめんてきかい","zenmenteki kai","名詞"],["oversight","かんとく","kantoku","名詞"],
  ["paradigm","ぱらだいむ","paradaimu","名詞"],["procurement","ちゅうもん","chuumon","名詞"],["reimburse","かんぺいする","kanpei suru","動詞"],
  ["restructure","さいへんせいする","saihensei suru","動詞"],["retention","りゅうにん","ryuunin","名詞"],["scalable","かくだいかのうな","kakudai kanou na","形容詞"],
  ["subsidy","ほじょきん","hojokin","名詞"],["synergy","きょうどうこうか","kyoudou kouka","名詞"],["tangible","ちかくできる","chikaku dekiru","形容詞"],
  ["transparent","とうめいな","toumei na","形容詞"],["utilize","りようする","riyou suru","動詞"],["workflow","わーくふろー","waakufuroo","名詞"],
  ["aftermath","じせい","jisei","名詞"],["align","そろえる","soroeru","動詞"],["appraisal","ひょうか","hyouka","名詞"],
  ["arbitrate","ちゅうさいする","chuusai suru","動詞"],["assert","だんげんする","dangen suru","動詞"],["commence","かいしする","kaishi suru","動詞"],
  ["comply","したがう","shitagau","動詞"],["convey","つたえる","tsutaeru","動詞"],["deduct","さしひく","sashihiku","動詞"],
  ["defer","えんきする","enki suru","動詞"],
  ["affiliate","しゅうせきする","shuuseki suru","動詞"],["aggregate","しゅうごうする","shuugou suru","動詞"],["amend","しゅうせいする","shuusei suru","動詞"],
  ["articulate","めいりょうにのべる","meiryou ni noberu","動詞"],["complement","ほきょうする","hokyou suru","動詞"],["convene","しゅうごうする","shuugou suru","動詞"],
  ["differentiate","くべつする","kubetsu suru","動詞"],["disseminate","ふきゅうする","fukyuu suru","動詞"],["endorse","しょうにんする","shounin suru","動詞"],
  ["enumerate","れっきょする","rekkyo suru","動詞"],["envisage","そうぞうする","souzou suru","動詞"],["eradicate","こくめつする","kokumetsu suru","動詞"],
  ["escalate","えすかれーとする","esukareeto suru","動詞"],["evacuate","ひなんする","hinan suru","動詞"],["exemplify","れいしょうする","reishou suru","動詞"],
  ["expire","まんきする","manki suru","動詞"],["finalize","けっていする","kettei suru","動詞"],["fluctuate","へんどうする","hendou suru","動詞"],
  ["formulate","もくろみをたてる","mokuromi wo tateru","動詞"],["foster","そだてる","sodateru","動詞"],["guarantee","ほしょうする","hoshou suru","動詞"],
  ["harmonize","ちょうわさせる","chouwa saseru","動詞"],["hypothesize","かせつをたてる","kasetsu wo tateru","動詞"],["incorporate","とりいれる","toriireru","動詞"],
  ["indicate","しめす","shimesu","動詞"],["infer","すいそくする","suisoku suru","動詞"],["integrate","せつごうする","setsugou suru","動詞"],
  ["intervene","かいにゅうする","kainyuu suru","動詞"],["invalidate","むこうにする","mukou ni suru","動詞"],["legitimize","ごうほうかする","gouhouka suru","動詞"],
  ["liquidate","せいさんする","seisan suru","動詞"],["modify","しゅうせいする","shuusei suru","動詞"],["monitor","かんしする","kanshi suru","動詞"],
  ["negotiate","こうしょうする","koushou suru","動詞"],["nominate","ていめいする","teimei suru","動詞"],["notify","つうちする","tsuuchi suru","動詞"],
  ["nullify","むこうにする","mukou ni suru","動詞"],["obsolete","ふるくなった","furuku natta","形容詞"],["outline","あらすじ","arasuji","名詞"],
  ["overlap","ちょうふくする","choufuku suru","動詞"],["penalize","ばっする","bassuru","動詞"],["perceive","ちかくする","chikaku suru","動詞"],["petition","ちんがんする","chingan suru","動詞"],
  ["postpone","えんきする","enki suru","動詞"],["preclude","ふせぐ","fusegu","動詞"],["predetermine","あらかじめきめる","arakajime kimeru","動詞"],
  ["prescribe","しじする","shiji suru","動詞"],["preserve","ほぞんする","hozon suru","動詞"],["preside","しゅさいする","shusai suru","動詞"],
  ["prevail","しょうする","shou suru","動詞"],["prohibit","きんしする","kinshi suru","動詞"],["promulgate","ふれつする","furetsu suru","動詞"],
  ["prosecute","きそする","kiso suru","動詞"],["provision","きょうきゅう","kyoukyuu","名詞"],["ratify","しょうにんする","shounin suru","動詞"],
  ["reconcile","ちょうていする","choutei suru","動詞"],["recur","さいはつする","saihatsu suru","動詞"],["refute","はんばくする","hanbaku suru","動詞"],
  ["reinstate","ふくしょくする","fukushoku suru","動詞"],["relinquish","ほうきする","houki suru","動詞"],["relocate","いてんする","iten suru","動詞"],
  ["remunerate","ほうしゅうする","houshuu suru","動詞"],["renovate","しゅうりする","shuuri suru","動詞"],["repel","はねかえす","hanekaesu","動詞"],
  ["replicate","ふせいする","fusei suru","動詞"],["repudiate","きょひする","kyohi suru","動詞"],["reschedule","すけじゅーるをかえる","sukejuuru wo kaeru","動詞"],
  ["reside","すむ","sumu","動詞"],["resign","じにんする","jinin suru","動詞"],["resume","さいかいする","saikai suru","動詞"],
  ["retrieve","とりもどす","torimodosu","動詞"],["revoke","とりけす","torikesu","動詞"],["sanction","けんきをあたえる","kenki wo ataeru","動詞"],
  ["scrutinize","けんさする","kensa suru","動詞"],["sever","たちきる","tachikiru","動詞"],["solicit","もとめる","motomeru","動詞"],
  ["speculate","すいそくする","suisoku suru","動詞"],["stipulate","きていする","kitei suru","動詞"],["subordinate","したくみの","shitakumi no","形容詞"],
  ["substantiate","しょうめいする","shoumei suru","動詞"],["supervise","かんとくする","kantoku suru","動詞"],["supplement","ほきょうする","hokyou suru","動詞"],
  ["surpass","こえる","koeru","動詞"],["susceptible","びんかんな","binkan na","形容詞"],["terminology","じゅつご","jutsugo","名詞"],
  ["testify","しょうげんする","shougen suru","動詞"],["tolerate","たいにんする","tainin suru","動詞"],["transact","とりひきする","torihiki suru","動詞"],
  ["transcend","こえる","koeru","動詞"],["transcribe","うつす","utsusu","動詞"],["transpire","あきらかになる","akiraka ni naru","動詞"],
  ["undermine","そこなう","sokonau","動詞"],["validate","ゆうこうにする","yuukou ni suru","動詞"],["verbalize","ことばであらわす","kotoba de arawasu","動詞"],
  ["verify","かくにんする","kakunin suru","動詞"],["waive","きょひする","kyohi suru","動詞"],
  ["warrant","しょうこ","shouko","名詞"],["withhold","おさえる","osaeru","動詞"],["yield","しゅうかく","shuukaku","名詞"],["zeal","ねつい","netsui","名詞"],
  ["abolition","はいし","haishi","名詞"],["adherence","じゅんしゅ","junshu","名詞"],["adjourn","きゅうかいする","kyuukai suru","動詞"],["affidavit","ていしょ","teisho","名詞"],
  ["aggregation","しゅうけい","shuukei","名詞"],["allegation","しんそう","shinsou","名詞"],["amendment","しゅうせいあん","shuusei an","名詞"],["appendix","ふろく","furoku","名詞"],
  ["appropriation","しさん","shisan","名詞"],["arbitrator","ちゅうさいにん","chuusainin","名詞"],["attribution","きせい","kisei","名詞"],["auditor","かんさにん","kansanin","名詞"],
  ["authorization","けんきづけ","kenkizuke","名詞"],["automation","じどうか","jidouka","名詞"],["bilateral","そうごの","sougo no","形容詞"],["bylaw","じょうれい","jourei","名詞"],
  ["capitalization","しほんか","shihonka","名詞"],["collateral","ていとう","teitou","名詞"],["compensation","ほしょう","hoshou","名詞"],["confirmation","かくにん","kakunin","名詞"],
  ["consolidation","とうごう","tougou","名詞"],["constitution","けんぽう","kenpou","名詞"],["consultation","そうだん","soudan","名詞"],["contamination","おせん","osen","名詞"],
  ["continuation","けいぞく","keizoku","名詞"],["contravention","いはん","ihan","名詞"],["convention","きょうぎ","kyougi","名詞"],["conveyance","てんそう","tensou","名詞"],
  ["credential","しょうめいしょ","shoumeisho","名詞"],["default","けいやくいはん","keiyaku ihan","名詞"],["deferral","えんき","enki","名詞"],["deficiency","けっかん","kekkan","名詞"],
  ["delegation","だいひょうだん","daihyou dan","名詞"],["designation","してい","shitei","名詞"],["disbursement","しはらい","shiharai","名詞"],["disclosure","かいじ","kaiji","名詞"],
  ["discretion","さいぎ","saigi","名詞"],["dissolution","かいさん","kaisan","名詞"],["distributor","はいきゅうしゃ","haikyuu sha","名詞"],["diversification","たようか","tayouka","名詞"],
  ["endorsement","しょうにん","shounin","名詞"],["enforcement","きょうせい","kyousei","名詞"],["entitlement","けんり","kenri","名詞"],["exclusion","じょがい","jogai","名詞"],
  ["expiration","まんき","manki","名詞"],["franchise","こんきょけん","konkyoken","名詞"],["grievance","ふまん","fuman","名詞"],["indemnity","ほしょう","hoshou","名詞"],
  ["insolvency","とうは","touha","名詞"],["jurisdiction","しょかん","shokan","名詞"],["litigation","そしょう","soshou","名詞"],["obligation","ぎむ","gimu","名詞"],
  ["remedy","さいせい","saisei","名詞"],["remittance","そうきん","soukin","名詞"],["reparation","ほしょう","hoshou","名詞"],["revocation","とりけし","torikeshi","名詞"]
];

// 250件に統一（TSL 501-750）
const V730_250 = V730.slice(0, 250);
if (V730_250.length !== 250) {
  console.error('V730_250 length:', V730_250.length);
  process.exit(1);
}

function formatBlock(arr) {
  return arr.map((row, i) => entry(i + 1, row[0], row[1], row[2], row[3])).join(",\n");
}

const V730_250_final = V730.slice(0, 250);
const V860_250 = V860.length >= 250 ? V860.slice(0, 250) : V860;
module.exports = { V730: V730_250_final, V860: V860_250 };

if (require.main === module) {
  const dir = path.join(__dirname);
  let js = fs.readFileSync(path.join(dir, 'wordList.js'), 'utf8');
  const header730 = '// 中級レベル（目標730点）用単語リスト - TSL ランク 501-750\nconst vocabulary730 = [\n';
  const new730 = header730 + formatBlock(V730_250_final) + '\n];';
  const re730 = /\/\/ 中級レベル[\s\S]*?const vocabulary730 = \[[\s\S]*?\n\];/;
  if (re730.test(js)) js = js.replace(re730, new730);

  const header860 = '// 上級レベル（目標860点）用単語リスト - TSL ランク 751-1000\nconst vocabulary860 = [\n';
  const new860 = header860 + formatBlock(V860_250) + '\n];';
  const re860 = /\/\/ 上級レベル[\s\S]*?const vocabulary860 = \[[\s\S]*?\n\];/;
  if (re860.test(js)) js = js.replace(re860, new860);
  fs.writeFileSync(path.join(dir, 'wordList.js'), js);
  console.log('vocabulary730: 250 words (TSL 501-750). vocabulary860: 250 words (TSL 751-1000). Done.');
}
