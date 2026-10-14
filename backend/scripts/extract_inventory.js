const fs = require('fs');
const path = require('path');

// Raw OCR text per page from Inventory.pdf
const pages = {
1: `8907093004569 vinegar 45 0
8906066200595 ROSEMARY 139 0
8906066200076 Nutmeg pow 199 0
8906066200625 thyme 139 0
8906066200540 lemogress 159 0
8906066200571 oregano 109 0
8906066207648 schez,chutney 84 0
8906066200519 basil 139 0
8906066200564 mix,herbs 139 0
8906066200557 mint pow 139 0
8906066201912 garlic pow 99 0
8906066205101 piri-piri 139 0
8906066201615 all purpos 130 0
8906066201721 pizz season 139 0
8906066201738 salad season 159 0
8906066201660 italian season 139 0
8906066201677 garli,bread 130 0
8906066201714 pasta seasoni 139 0
8906066201899 onion pow 99 0
8906066200038 red chil,flak 99 0
8906066202568 piz,chil,flak 119 0
8906066202605 black,salt 50 0
8906066202735 pink,salt 89 0
8906066202476 piri-piri spice mix 119 0
8907316006172 panpiur, past 63 0
8908007864644 anjeer 250g 380 0
8901058017687 magi75g 15 0
A8906223961011A pohaa 23 0
8904043904054 pohaa 500g 63 0
8906066203022 creamy,mushro,soup 15 0
8901491103794 oats400g 86 0
8907093007393 keral,fish,curry 180 0
8907093008291 butter,chick,mix 200 0
8906066205934 pasta masal,7g 5 0
8906066204920 veg.manchu,masal 10 0
8906066203053 chick.hot,soup 10 0
8906066203015 creamy,chick,soup 15 0
8906066203077 swt.corn,chick,soup 10 0
8906066204906 pannrr,chill,masal 10 0
8906007280969 fortune 1kg must.oil 235 0
8906007280945 fortune 500g must.oil 123 0
8901030992063 red lab,tea 100g 50 0
8909106064874 tea.taj100g 80 0
8901052020485 chakar.tea gold100g 90 0
8906017290989 bisler water 1lit 90 0
8909106051966 tea,TAJ 250G 200 0
8901030624230 TAJ.DIP,TEA 220 0
8901030992070 TEA,redlabe250g 140 0
8908028493007 water 750ml 60 0
680569823625 homwdale 500g 190 0
8901030985584 tea 10rs 10 0
8908002396331 coconutoil 500ml 296 0
8904505701269 fortune sunfl.oil 1lit 180 0
8909106066410 bur coff.10rs 10 0
8901058025095 sunrise coffpow 10 0
89080863 2rs coffpow 2 0
8903071005320 kewra.water 72 0
8907093005108 apple,cider,ving 120 0
8907423859200 whit,vineg 15 0
8901207062865 hajmol imli 70 0
8901058028959 milkybar5rs 5 0
8901071705295 llollipo 5 0
8901393027600 llollipo 5 0
7622202818431 5star 5rs 5 0
8901058875577 milkybar10rs 10 0
8000500366776 tictac10rs 10 0
8901071705271 llollipo 5 0
7622202818400 5star 10 0
8901058022087 munch5rs 5 0
8901393018868 centerfresh 10rs 10 0
7622202815096 daiymilk10 10 0
8901058896862 milkybarmoosh 10 0
7622202326172 DM,rostalmond 98 0
7622202325878 DM,choclatesilk 100 0
8901058028966 milkybar308gm 137 0
7622202326325 silk ganach cholotD,M 98 0
7622202324727 DM,crackle 107 0
7622202842269 D,M,slik HAZENUT 100 0
7622202271861 D,Mslik,BUBBLY 98 0
8901058024074 BAR-ONE 10 0
7622202818400 5STAR 10 10 0
7622202324871 D.M,FRUIT&NUTS 49 0
7622202325878 D,M chololet 89 0
8906002482450 snickers45g 50 0
7622202818332 D.M, CHOLOT 10 0
7622202335518 LIckables cholote 45 0
7622202820823 fuse,chocolaty 20 0
8901058018639 milkybar 20 0
7622202325991 bournvil,50%dark 134 0
8901058024104 barone cholot 372g 148 0
7622202335624 Temptations alm,tret 125 0
8902618000019 woodwards 60 0
8901088712668 cocont,oil,parachut 20 0
8901088712101 J.cocont,oil,parachut 20 0
8901088076104 cocont,oil,parachut 43 0
89080214 JASMIN,OIL 20 0
89009536 Amla oil 18 0
8901207047923 Amla,oil138ml 53 0
5792136842535 pure.olives,oil 180 0
8901207040795 gulabari,dabue 54 0
89009611 gulabari,dabue 30 0
8901207040443 dabu,badam,shireen 235 0
8901207026485 almond.oil,hair 66 0
8904505700378 jeera,rice 1kg,kohnoor 250 0
8904010610308 palak.matt,rice 5kg 450 0
8906007289214 F.sonimasoori 5kgs 430 0
8902979012492 mano.pickle 5rs 5 0
8902979012508 pickle 5rs 5 0
8901725011567 homelight 20 0
8906037731660 pineapp,agarbathi 65 0
8906037731875 pineapp,agarbathi 15 0
8901287000092 mallika agarbathi 54 0
8901725098391 mach,box 10 0
8901063325791 milk,rusk200gm 35 0
8906016491875 classic rusk 10 0
8901207027949 odonliu r,fresh 120 0
8901725117306 creme swt lacto pkc 50 0
8901725012915 gold ,kings10s 240 0
8901725014612 gold,lightss 10s 240 0
8901725089511 ices,bust 10s 240 0
8901725307912 cls connects 390 0
8901725120610 class-doubl.bust 20s 480 0
8901725034115 class-ulter-mild 20s 480 0
8901725033811 class-mild 20s 480 0
89009734 marlboro 20s 480 0
8902953376015 america cool 360 0
8902953376015 america red 360 0
89008751 advance marblb 115 0
8906017290071 bisler 5lits,H20 75 0
8908000034860 DOMS CHALKS 20 0
8906136382442 FIGO SET SCHOL 15 0
8906156880010 CAMPHOR TABL 62 0
8906156880003 CAMPHOR TABL 32 0
8906048271063 GOPURM, turmi pow 20 0
8901198431107 parker vector pen 430 0
8901238910005 kangar,pin 12 0
8901860010098 fevi kwik 5rs 5 0
8906136383654 10rs,figo pescil0.7 10 0
8901425048511 10rs,figo pescil0.5 10 0
8904142201207 calau,electr 120 0
8901425048634 camel,wax,crayon 35 0
8901198113157 paint colour 10 0
8901198113164 paint colour 20 0
8901117249998 ors,apple 200ml 32 0
8901117250000 ors,orang,200ml 32 0
8904083307037 cheese cubes 10N 150 0
8904083300595 Milkybutter,chiplet 10N 90 0
90162602 RED,BUL250ML 125 0
8901764241253 TONIC.water 60 0
8902080100026 leho,soda 27 0
757953642923 RUMI,energy 60 0
8901324055795 apsara,pencil 60 0
8901057309295 kangaro,crycler,tap 68 0
8901425019559 watercolo,12shades 35 0
8908006475339 colou-pensil 10shad 15 0
8901860546757 fevic,mouldit clay 25 0
8901425048337 camelpencilsbox 60 0
8901425006283 camel WAX 10 0
8901425006283 camel WAX 10 0
8901425006559 camlin coloupencil 60 0
8902635573589 wax crayons 60 0
8901425095539 camel drawing kit 149 0
8904379400954 glue stick 15 0
8906082931169 clay modelling 40 0
8901198125488 luxar stamp.pad 35 0
8901057200523 kangat,paper,punch 112 0
8901425001974 camel sketchpen 30 0
8906136383845 figo eraser pen 30 0
8901425028742 camel watercolou 20 0
8901057510028 kango,staplepin 12 0`,

2: `8904411801237 math,drawing,instrum 75 0
8906082930179 stickynotes 60 0
8906082931954 modelling clay 25 0
8908000034365 doms eraser 5 0
8904411802173 doms eraser mini 5 0
8901860634270 glue drops 20 0
8904461900041 cutter premi 15 0
8904275306985 correction PEN 30 0
8906082930131 STICKNOTES 40 0
8901425027721 CAMLIN SCAL 15CM 5 0
8901425022504 Camlin scal 30cm 12 0
8901425076781 camlin glue 200g 85 0
8901860010432 flexkwik 20g 60 0
8901860020516 MCL 25G 10 0
8901425089316 CAML,SHARPEN 3 0
8908000034075 SHARPEN 5 0
8906136380240 EXAMPAD 180 0
8906168990042 CARTRIDGE V5,V7.B 30 0
8906168990042 CARTRIDGE V5,V7.D 30 0
8906136382442 FIGO SET SCHOL 15 0
8906051078666 pen 5 0
8901765095732 pen,blue 10 0
8906136384279 hi-leads tip 10 0
8901198112365 cd marker black 10 0
8906136382824 blackgelpen 10 0
8901015003715 montex pen 10 0
8906168990011 v5 blackpen 70 0
8906168990028 v7 blackpen 70 0
8901198117933 spiral book20561 45 0
4987176137524 pamper, s7 93 0
4987176071361 pamper,XL2 35 0
4987176218346 Pamper XL6 117 0
4987176071323 Pamper ,S2 18 0
4987176071385 Pamper M2 23 0
4987176071392 Pamper NB2 18 0
4987176367853 WHISPER12PXL 75 0
4987176319180 WhisperXL6P 45 0
4987176321152 WhisperREG6P 37 0
8901012165843 Stayfreesecu6p 37 0
8901012165768 stayfreenighXXL6 50 0
4987176294562 whisperXL6P 65 0
4987176324672 whisperXL10P 70 0
4987176319517 whisperXL6P 50 0
4987176319432 WhisperXXL 50 0
4987176336392 WhisperXXXL 140 0
4987176318435 WhisperM-L 99 0
4987176319432 WhisperXXL 50 0
8901012166482 StaufreeXXL 7P 110 0
4987176195708 Whisperxxxl+4 150 0
4987176301956 whisperxxl7p 110 0
4987176178688 pampers S30P 399 0
8906156554058 BHEEM pantsXXL 449 0
8901138837174 HIMALAYA PANTS,S9 125 0
4987176218346 pampers,XL6P 117 0
4987176346179 pampers,XXL16P 425 0
4987176346315 pampers,M24P 350 0
4987176346278 pampers,S28P 399 0
4987176318428 whisperchoice6P 50 0
4987176071453 pampers,S10P 93 0
8901425054444 Canvas boaed16*20 235 0
8901425054437 Canvas boaed14*18 179 0
818068035397 BALL 9P X-MAX 190 0
818068035281 BALL 9P X-MAX 190 0
818068035243 BALL 9P X-MAX 190 0
8904094400390 Feedingbottle 110 0
8808739000207 marry,christ 180 0
6932004400248 decoration spray 60 0
8901425054758 camlin book80p 34 0
5797976389103 b,day candles 25 0
8901425031926 camel,glasspaint 120 0
8901425054413 Canvas boaed 10*12 100 0
8901425087237 Canvas pad 300 0
8901425054567 Canvas boaed8*8 65 0
8901425087442 drawingbook 35 0
8901425081952 camlinbook4line 50 0
8901425073308 sciecebook 75 0
8901425109021 camlinbook 32 0
8901425055403 camlinbook 37 0
8901425073292 camlinbook 40 0
8901425109687 camlinbook 50 0
8901425073421 camlinbook 60 0
8901425054772 camlinbook 35 0
8901425112397 camlinbook 60 0
8901425058909 camlinbook 60 0
8901425107133 camel litte brush 40 0
4987176071385 pampersM2 23 0
4987176356895 pampersXXL2P 44 0
4987176071347 pampersL2P 30 0
4987176215017 pampersM12P 210 0
8901138837181 HIMAL. PANTS,M9P 150 0
4987176071446 Pamper NB10P 93 0
4987176141743 Pamper S15P 199 0
4987176215017 Pamper M11P 199 0
4987176137500 Pamper NB8P 100 0
4987176137524 Pamper S7P 99 0
4987176137548 Pamper M6P 99 0
8906002484041 Pedigree,adult 25 0
8906002484027 Pedigree,adult 25 0
8906002482832 Pedigree,adult370g 100 0
8906002482962 Pedigree,puppy370g 110 0
8906125483938 drools dog adult400g 99 0
8853301530743 Pedigree,adult.gravy 50 0
8853301530750 Pedigree,pupp.gravy 50 0
8853301015936 whishas gravy 50 0
8853301015912 whishas gravy 50 0
8853301015868 whishas gravy 50 0
8904083307037 milkymistcubes 150 0
8904083300595 milkymist butt10p 90 0
8906096573126 mom gas,lighter 199 0
8908004996010 klik gaslighter 175 0
8901571011339 iodex spary60g 230 0
8901177104909 moov spary15g 92 0
8906014520492 gokul power 10 0
4987176191380 vicksnose relife2p 129 0
4987176341846 vicksinhaler3p 189 0
8901207037948 odomos cream 30 0
8901177102509 moov ointment 68 0
8901177103605 itchguard** 71 0
8901248101103 boroplus cream 42 0
8901248701105 zandubalm 43 0
8901803001541 amrutajanEPOWER 43 0
8901803001190 AMRUTAPAINBAM 42 0
4987176168405 Babyrub 25ml 125 0
4987176191205 vickvapo25ml 102 0
89006245 iodox bam 45 0
8901012155080 gohnso,BUDSS 154 0
8901012155073 GOHNSOBUDS 75 0
8902915888822 PLAYINGCARD 75 0
8901057004008 MUNIX,Scissors 46 0
4987176212474 gillettesaloon 30 0
8905110009863 Engage,DEOSPARY 130 0
8905110006855 DEOSPARY 230 0
4987176073440 H&S Shampo 72ml 84 0
4902430716871 H&S conditio 80ml 82 0
B07S2WW2NZ roma,secretdeo 399 0
8901725959289 engage,SPARY 65 0
8901138509217 himalay,facwash 95 0
8904041178631 Garbag M size 75 0
8904041178624 Garbag S size 65 0
8904041178600 Garbag L size 85 0
8901860630708 FEVICOL 500G 200 0
8901860630500 Fevicol120g 60 0
8901425076781 camlin gule200g 85 0
8901860630241 10rs fevicol 10 0
8901860630005 5rs fevicol 5 0
8901425024416 camel acrylic 6pc 110 0
8901425000427 camel postcolour6pc 100 0
8901425000434 camel postcolour12pc 185 0
8901425105443 camel acrylic 12pc 220 0
8901691000824 everedy AAAcell 18 0
8906014385183 powercell AA 17 0
8906014385152 POWercell AA 10PC 170 0
8901691026220 everedy AAAcell 10PC 180 0
8901255000420 PANASONIC AA 17 0
8901255000444 PANASONIC AA 10PC 170 0
5000394083912 DURECELL AAA10PC 220 0
5000394178649 DURECELL AAA12PC 180 0
89003169 Panasonic AAA 18 0
89003183 Panasonic 10pc AAA 180 0
8906164392017 Food,Wrap500gm 350 0
8901023019876 goorejrichcrem 37 0
8901023028748 goorejrichcrem15rs 15 0
8902979011136 indicaeasy15rs 15 0
8902979027137 indicaeasy30rs 30 0
8901526211715 garnierburgundy 45 0
8901526211722 garniBROWN 45 0
8901526209910 GARNI,BLACK 45 0
8908011235140 VIP Haircolou 51 0
8901023029486 indicaeasy15rs 15 0
8901023018688 indicaeasy30rs 30 0
8901526209903 GARNI,BLACK 45 0`,

3: `815865000115 blackrose pow 12 0
8906016052922 blackrose shampoo 10 0
8901491001038 lay red tango80g 48 0
8901491000772 lay creantango80g 48 0
8901491503020 lay 10rs B 10 0
8901491001854 LAY 10RS 10 0
8901491503037 LAY 10RS 10 0
8901491503051 LAY 10RS 10 0
8901491503013 LAY 10RS 10 0
8901491100274 LAYS BLUE 20 0
8901491100328 LAY 20RS ,G 20 0
8901491101837 LAY 20RS,Y 20 0
8901491000208 DORITOSS,CHIP 20 0
8901491103442 KURKUR,TOMA 20 0
8901491990219 DoritNacho10rs 10 0
8901491990226 DoritNacho10rs 10 0
8901491103046 kurkurchillsty 10 0
8901491103282 cheetoschee 10 0
8901491103435 cheetosmasl 10 0
8901491001076 layscream35rs 35 0
8901491001069 laysmagic30 30 0
8901262300759 dark ice cream 18 0
8909106048935 ice cream buttersct700ml 125 0
8901030775925 ice cream strab 700ml 125 0
8909106048898 ice mango 700ml 135 0
8901030735110 tub ice cr butterscto 700ml 160 0
8904083321521 rabdi kulfi 30 0
8721274500233 magnum carampop 70 0
8904083321019 capella,almoind 45 0
8909106034921 magnum,almond 80 0
8909106034938 choclat,magum,truff 70 0
8904083321026 biscofficecream 40 0
8909106045101 feastcrackle,icecrm 60 0
8904083320951 capelladueticecrem 55 0
8909106042285 magnumalmond cone 90 0
8901030735103 alpho,mang700ml tub 160 0
8901030735097 vanil,icevrm700mltub 145 0
8901439000598 butt,mushoom.forzz 229 0
8902756650022 poto,chee froz400gm 229 0
8902756311701 G,french,fry425g 117 0
8902756340152 G.Chick,burgpatty300g 196 0
8902756630017 G,crisp,potatstarzz400g 126 0
8906000610077 Mac,smile,forz415gm 150 0
8906000610725 Mac,masl,fryss,420gm 175 0
8902756311800 G.Per-peri frys400g 126 0
8902756663640 G,Chees,corn,nugg 150 0
8901968333358 Mac,Supr,wedges400g 155 0
8906000610336 Mac,Alootikk400g 130 0
8906000610053 Mac,Frech,fry420g 125 0
8906000610251 mac,veg,burgerpatt360g 150 0
8908022693113 NAAN,Fres2Go 155 0
9501100600967 puffpastry,400g 250 0
8901968333358 But,fishbread forzz 335 0
8902756340152 chick,burgpatty 196 0
8902756351837 G,chickNugg200g 150 0
8901968333655 BF,Chicksalami200g 240 0
8904083301110 pizzchee,MOZZ 150 0
8906017112526 Whip,cream,forzz500g 195 0
8902756421929 G.Chick,garli,fing400g 257 0
8902756780019 G.chick,serekkebab400g 295 0
8902756352056 G,chickchees,nugg325g 267 0
8901968335802 spicychicksheekebab 195 0
8902756671966 G.Chickpopcorn400g 257 0
8902756350083 G.tando.chicknugg400g 271 0
8902756301795 G.Gree,peas500g 160 0
8901968333679 BFbredfish,finger10pc 275 0
8901968333525 BF.smok,chickHam 340 0
8901968333723 BF.Chicksheekebab240g 185 0
8906000610909 MAC,Potocheeshot 265 0
8938900105476 basfishfillets1kgs 500 0
8904083300298 milkykhova 1kg 395 0
8906140290023 greenpeas,forz 200g 70 0
8902756291782 greenpeas,forz 200g 70 0
8904083300281 milkymistKHOVA 110 0
1 RICH CREAM 40 0
20001 Apple broom 210 0
20003 canv8*10 90 0
20005 gas light 199 0
20002 canva big 210 0
20004 pamp38xl 38 0
20006 vaponewrub 109 0
20007 mult,floorclean 1lit 145 0
10040 fresh,floor wash 1lit 70 0
10041 ballon 190 0
20008 colog past100g 76 0
10084 odonil 1p,Rm,fresh 58 0
8901207042447 odonil 1box,Rm,fresh 220 0
8901207048005 odonil 1box,Rm,fresh 220 0
20009 dettol,sope100g 44 0
10056 emil 100g 29 0
20010 Kewra-water500ml 72 0
20011 fruitcocktail syrup 199 0
8901439000291 fruitcocktail syrup 199 0
8904335606055 highprot.OATS,Yoga 200 0
7622202225093 silk brownie140g 267 0
7622202842290 silkhazelnuts134g 214 0
7622202842429 silkfruitnuts129g 214 0
7614500010310 Tobleron honeyalmond 255 0
7622300107949 tobleronemilkchotl 225 0
8906020589414 insta,ID,Coffe50g 144 0
7622202325960 70%dark bournille 150 0
tang,mango750g 249 0
8901071705721 hersheyscreamymilk 137 0
8901058020021 munchnutmax 25 0
8000500066027 kinder bueno 130 0
8901725015343 fantastiu,roastalmond 50 0
7622202326264 silkroastAlmond134g 214 0
7622202233944 silkchocolate144g 222 0
7610400112932 lindorMilk smooth 475 0
8901058898330 nescaf,chocodrink 45 0
8901071705684 hershys,darks38g 65 0
7622202325847 dark50%bounvill rum 134 0
8902433031656 snickers,almond 70 0
7610400039796 LINDOR37.5G 195 0
6221134030204 BOUNTY,Imported 99 0
8901058867855 nesteICE TEA ,drink 30 0
8906020580916 ID,filtercoff,liqud 160 0
8906020589209 ID,filtercoff,liqud 144 0
8901058020281 munch brownimax 25 0
8901123001764 perero sticks 45 0
8902433003820 galaxy cookiecrumble 180 0
7622202224997 silkPlumcake 107 0
8902433008184 snickers,peantbrow 70 0
8901725112646 dark,fant,chocchunks 75 0
7622202326080 silk,oreo dairymilk 214 0
7622202326363 silk mouss,dairymilk 214 0
7622202324604 dairymilk family 125 0
8993039243352 marie DUO Biscuti 199 0
8901071702195 hersh,Dark,blueberry 155 0
8901071702218 hershy,dark,pomegrant 155 0
8908001658584 O\`Cean fruit drink500ml 70 0
8908001658607 O\`Cean fruit drink500ml 70 0
8908001658034 O\`Cean fruit drink500ml 70 0
8908001658591 O\`Cean fruit drink500ml 66 0
8904335604983 yogabar,,dryfruitmix 990 0
8683666233511 Bubble,tea,strawberry 399 0
8683666233528 Bubble,tea,mango 399 0
8904335601593 yogabar,choco 230 0
8902433008467 galaxysmoothmilk 180 0
7622202325991 50%darkbourvill 134 0
8904335601951 100% rolled oasts 1kg 439 0
8901071702898 dark,almonds30g 60 0
7622202271830 silk bubbly big 214 0
9331275006536 monetta wafers 325 0
8902433030932 Boomer GUMS 50 0
8904083321736 DARK, choclat,hazlnut 65 0
8906020589254 ID,Filtercoff,liqud5PC 54 0
8906020588127 ID,Filtercoff,liqud5PC 110 0
8901071705707 HERSH,WholeALMO 145 0
8902433008504 Galaxy fruitnuts 180 0
20011 Galaxy fruitnuts 199 0
8901071705769 hersh,almonds40g 62 0
8902433005688 galaxy,fusion 70% 250 0
7622202836572 oreoo golden275g 87 0
8902433003134 snickers,buttersct 70 0
8008857200194 spaghetti pastas italy 699 0
8904083321668 MILKchocolat haz 65 0
8904083321651 milkchocol capella 60 0
8902433007217 Boomerkrunch,GUM 45 0
8901071702256 Dark,pomegrant choclat 57 0
8901071702249 dark,raspbrry,chocol 57 0
8000500455876 FerreroROCHER MOMENTS 179 0
8901058023558 Kit-kat delight14mimi 220 0
8901123005380 lotte,chocopiee 30 0
8906066202308 lemonconcenter 79 0
8000500126936 FerreroRocher50g 169 0
8906066831607 wafer cubes dark 150 0
7622202326387 silk Ganaches big 214 0
7610400112925 smooth,lindor6pcs MILK HAZELNUT 475 0
8902433002779 skittles90g 99 0
8699462609924 LEXUS hazenut&milk 239 0`,

4: `8000500003787 FerreroRocher200g 539 0
7622202364907 cookiesCADBURY 160 0
8901058030228 kitKat 14Rich,delight 375 0
7622202051661 tang,orange750g 249 0
8000500411469 Ferro,ROCHER90G 269 0
7622202257575 OREO,biscui,family 274 0
8901058898347 Nescaf,Intense cafe 45 0
8901058899092 Milo drinkingcholot 45 0
8906009077277 Sugar free,cookies 60 0
8000500396469 FerreroROCHER185g 539 0
8000500009673 FerreroROCHERbox 879 0
8901972086110 ticktime crackers 75 0
7622202308659 biscofficecream 110 0
8902433002809 skittles90g 99 0
8901057600286 kohe-peeler 80 0
8901057600231 kohe-straigh-peeler 50 0
8901057600262 kohehandle-peeler 65 0
8906096573119 coconuto-pener 138 0
8901057600095 kohe-paringnife 95 0
8901057600026 kohe-knife 50 0
8901057600071 kohe-curved-nife 95 0
8901071705264 jolly lollipops 5 0
7622202237379 dailymilk lollipops 5 0
7622202819995 Gems 5rs 5 0
8901393027600 Alpenliebe lollipops 5 0
8901393019780 Alpenliebe lollipops 5 0
8901393026436 chupu lollipos 5 0
8901071705288 jolly lollipops 5 0
8901393026412 chupu lollipos 5 0
8906069714785 sup,jumbo bottel 130 0
8906057628056 schoolwaterbottal 100 0
20012 steelpoto,peeler 150 0
6953666093401 8.5inc,Scissors 250 0
6901577690028 6.3inc,Scissors 65 0
6941057466125 double,quick,pump 449 0
4987176282927 gillette fusion5shave 425 0
4987176077776 gillettemach3 275 0
4987176103222 gillette fusion5shave 399 0
4987176151643 gillette vector3 149 0
4987176357922 gillrtte fusion5 B2 649 0
4987176300508 Gillettemach3 B2 425 0
4987176093714 gillette shavGel60g 99 0
4987176281227 gillette brush 85 0
4987176106018 gillrtte GEL 195g spy 325 0
4902430722193 gillet,FOAM,50g 90 0
8901103122144 fem,fair&soft60g 85 0
4987176278180 venus,gillett smoot 89 0
20013 cinthol,shavingcream 25 0
8901103101262 Fem,Bleach8g 37 0
8909106048270 vaselin,Moisturiser 130 0
4987176280596 gilletGuard B 14 0
4987176258168 GilletprestoRazo 25 0
4987176280541 gilletGuard4p 48 0
4987176335142 gilletGuard4p 52 0
4987176198723 Ambipur car 60Day 249 0
4987176198730 Ambipur car 60Day 249 0
4987176198747 Ambipur car 60Day 249 0
4987176162021 Ambipur car 60Day 349 0
8904055140570 super-Max-Razors 50 0
42204244 Nivea cream 60ml 150 0
8901396389613 Veet,Wax,Strip 120 0
8904094400147 sootherbaby,nip 30 0
8904094400475 nipple baby 30 0
8901396601784 veet,hairRemoval30g 109 0
4987176212474 gillet wilkson,10N 30 0
4987176212498 Gillette50N 150 0
8901526206377 garnier,burgundy 99 0
4987176244420 Ambipur car 60Day 349 0
20014 mortein machi100% 90 0
7622202237942 dairymilk10rs 10 0
8801038123097 eyebrow,Razor 110 0
8908011834114 razor 3 ladi 390 0
10067 alumini Foil9meter 90 0
10093 aluminiFOIL18Mts 195 0
20015 anti-slipmat45*125c 155 0
8906000510025 stumpr,ball,1pc 40 0
20016 shuttcock 22 0
8908019293074 pollie,cleaner bottle 220 0
20017 oil,dispenser 1lit 290 0
8904004400243 HR,soyastick 42g 10 0
8904004423730 HR,onionkoduba28g 10 0
8904004402827 HR,panchratanmix 23g 10 0
8904004402018 HR,AllinOnemix 36g 10 0
8904004401073 HR,khattmeeta 55g 10 0
8904004403671 HR,tastnuts38g 10 0
8904004400694 HR,aloo bhujia30g 10 0
8904004403725 HR,monngDal35g 10 0
8904004402131 HR,dryfruitmix200g 115 0
8904004412956 HR,navratanmix200g 60 0
8904004402537 HR,miniBhakawadi200g 65 0
8904004404647 HR,saltpeanut 200g 55 0
8904004401158 HR,Khattameet200g 55 0
8904004400892 HR,soyachips200g 45 0
8904004402834 HR,panchratamix 200g 90 0
8904004404210 HR,minisamosaa200g 65 0
8904004422900 HR,buttermurukk135g 55 0
8904004400045 HR,bhujisev200g 60 0
8904004403732 HR,Moongdal200g 60 0
8901277011312 ParkAvenue gromingkit 460 0
101268 RainTOP,Carry cote 165 0
E0002R mix,sabut garamasla 50 0
20018 Pista,unrosted 280 0
20019 Cucinnamonstick 30rs 30 0
8901499027634 multcornflacks 65 0`,

5: `8901719135149 monaco 18 0
8901719135293 krack jack 35 0
8901719131769 parle rusk 54g 10 0
8901719137914 parle rusk 200g 40 0
8904083300397 milky. straw 170ml 40 0
8904083300403 milky. choco 170ml 40 0
8904083322573 milky. vanil170ml 40 0
8902080105045 pepsi 300ml 40 0
8901719123870 parle-g 250g 30 0`,

6: ``,

7: `8904040300231 Anna. chiili pow 50g 30 0
8904040301603 Anna. cumin pow 50g 39 0
8906002081417 Sakt. mutton 50g 41 0
8906002081615 Sakt. biriyani 50g 50 0
8904040300491 Anna. fish pow 50g 29 0
8904040300187 Anna. chick pow 50g 26 0
8906002080311 Sakt. sambar 50g 31 0
8904040301078 Anna. turm pow 50g 24 0
8904040300590 Anna. garam pow 50g 40 0
8906002080618 Sakt. Rasam 50g 45 0
8904040300132 Anna. chic 65 50g 43 0
8904040300811 Anna. pepper p 50g 90 0
8906002080014 Sakt. turmeric 50g 24 0
8906002080113 Sakt. chilli p50g 25 0
8906002081813 Sakt. garam p50g 45 0
8906002080212 Sakt. corian p50g 20 0
8901719135149`,

8: `8901063325760 Brit. Toast Rusk 200g 40 0
8901063371064 marie gold 200g 30 0
8901063035256 Brit. milk bikis sand 56g 10 0
8901063032446 Brit. Croissant 48g 20 0
8901063368675 Brit. Gobbles cho 30 0
8901063025509 Brit. milk bikis 114g 20 0
8901063325227 Brit. Toast Rusk 50g 10 0
8901063018389 Brit. Timepass 63g 10 0
8901063035263 Brit. milk bikis 57g 10 0
8901063004269 Brit. Good cho 130g 30 0
8901063093638 Brit. Good cas 60g 10 0
8901063367340 Brit. Golmaal 61g 10 0
8901063368668 Brit. Gobbles fruit 30 0
8901063142831 Brit. nutri 58g 10 0
8901063033931 Brit. Treat vani 60g 10 0
8901063371057 marie gold 73g 10 0
8901063029408 Brit. jimjam 62g 10 0
8901063367319 Brit.Mas chas 42g 10 0
8901063370074 Brit. Good but 60g 10 0
8901063012349 Brit. milk bikis 150g 30 0
8901063371156 marie gold 147g 20 0
8901063142817 Brit. nutri 125g 25 0
8901063025448 Brit. milk bikis 66g 10 0
8901063093676 Brit. Good cas 34g 5 0
8901063370050 Brit. Good but 34g 5 0
8901063367296 Brit. 50-50 75g 10 0
8901063139374 Brit. Bourbo 60g 10 0`,

9: `8908008563102 Briyas peanut 340g 175 0
8904083301851 Milky. ghee 100ml 105 0
8904083301820 Milky. ghee 500ml 480 0
8904083301547 Milky. milkmaid 200g 75 0
8904083300670 Milky. butter 200g 160 0
8904083300144 Milky fcream 250ml 100 0
8908001588492 Asal coco ladu 50 0
8904083309888 Milky.cream cheese 235 0
8904083302339 Milky. yog cereal 60 0
8904083301585 Milky. yog honey 60 0
8904083302483 Milky. skyr 100g 75 0
8904083323174 Milky. skyr blue 80 0
8904083312086 Milky. Shrikhand 45 0
8904083314035 Milky. Mishtidoi 35 0
8908008563119 Briyas peanut cr 340g 175 0
8904083301844 Milky. ghee 50ml 53 0
8906042150975 Anil Soya 40g 10 0
8908008622151 Alfa tissue 45 0`,

10: `4987176177179 Old spice deo 75 0
4902430907712 tide lemon 50 0
4987176278562 Gillette vector+ 105 0
4987176303363 Gillette guard cream 25 0
4987176373403 Tide double power 10 0
4987176355751 Gillette guard 3 in 1 125 0
4987176301956 whisper ultra nights 7p 115 0
4987176319517 whisper choice 6p 50 0
4987176324672 whisper choice 10p 70 0
4987176356062 oral b extra soft 22 0
4987176286215 Gillete presto 25 0
4987176342645 Gillete venus 99 0
4987176286833 Gillete Mach3 275 0
4987176346360 Pampers L 21p 374 0
4987176300478 Gillette Mach3 2p 349 0
4987176373267 Tide + double 73 0
4987176340740 Gillette shaving cream 40 0
4987176294562 Whisper xl 6p 65 0
4987176335142 gillette guard 4p 52 0
4987176293527 Whisper ultra xl 7p 95 0
4987176367853 Whisper choice 12p 80 0
4987176215017 Pampers L 12p 196 0
4987176212498 Gillette Wilkinson 150 0
4987176319180 Whisper choice 6p 45 0
4987176335166 Gillette guard 7p 98 0
4987176278579 Gillette vector+ 2p 99 0
4987176332592 Gillette guard 1p 28 0
4987176071392 Pampers 2p NEW 18 0
4987176071385 Pampers M 2p 23 0
4987176071347 Pampers L 2p 30 0
4987176280596 Gillette guard 1p 15 0
8904073812954 Lunch box 249 0
6976541227753 Marshmellow heart 45 0
89007877 Double mint 10 0
8906059461576 Jillies jelly 95 0
6281004135934 Safari crunch 5 0
8904073812947 Lunch box 229 0
6970001030815 Pencil box 190 0
6979160193997 Pencil box 235 0
8904083303077 Milky curd 1kg 138 0
8904083310037 Milky garlic spr 120 0
8904083310020 Milky pepper spr 120 0`,

11: `8904083304036 Milky cheddar 175 0
8904083300625 Milky butter u 500g 400 0
8904083303015 Milky curd 400g 70 0
8904083300526 Milky butter s 500g 400 0
8904083301035 Milky mozzarella 170 0
8904083307068 Milky cheese blo 160 0
8904083310013 Milky plain spr 120 0
8904083300656 Milky butter u 100g 85 0
8904083310129 Milky che slice 10s 160 0
8904083300519 Milky butter s 100g 85 0
8904083300021 Milky paneer200g 135 0
8904083310136 Milky che slice 5s 85 0
8904083307037 Milky cheese cube 170 0
8904083300076 Milky paneer1kg 575 0
8904083300045 Milky paneer500g 335 0
8904083306047 Milky curd 135g 10 0
8906036673428 Nandhini milk f 37 0
8904083303039 Milky curd cup 200g 35 0
8904083302070 Milky yogurt man 40 0
8904083300106 Milky pan high p 160 0
8904083302063 Milky yogurt stra 40 0
8904083302438 Milky g yogurt 700g 325 0
8908008563003 Milky tofu 99 0
8904083302292 Milky g yogurt 100g 55 0
8904083302100 Milky yogurt blu 40 0
8904083302346 Milky g yogurt 225g 120 0
8904083306085 Milky curd 400g 42 0
8904083302094 Milky yogurt pea 40 0
8901764011252 Cocacola-org 40 0
8906350554786 SMT Coco oil 500ml 240 0
8908026028423 GEKS pineapple 30 0
8901764041259 Thumbsup 40 0
8908026028430 GEKS mixed 30 0
8901719137297 RikRak choco 10 0
8901764031250 Sprite 40 0
90162602 Redbull 125 0
757953642923 Rum energy shot 60 0
8902080100026 Lehar soda 27 0
8902080001361 7up 40 0
9354201759634 SMT Ging oil 200ml 120 0
8901719135248 Krack jack 56g 10 0
8901719129926 Parle-g Oats& berry 10 0
8901719134852 Parle-g 90g 10 0`,

12: `8901719129179 Parle-coconut 9 0
8901719105913 Hide & Seek 120g 30 0
8906125670246 Gulas jaggery pow 500g 59 0
8901719100369 Hide & Seek 33g 10 0
8901719135118 Monaco salt 52g 10 0
8906140772598 Thalir Rava 500g 45 0
8906042150074 Anil fing mil 180g 28 0
8906016976808 Mayil Gram flo 500g 80 0
8908000582385 SMT Coco oil 100ml 60 0
7898 White Poha 70 0
8906042151149 Anil Noodle 4pa 40 0
8906008811117 Fort. Maida 500g 65 0
8904505700187 Kohi.ric cl gold 1kg 235 0
8906008814057 Kohi.ric sup val 1kg 240 0
8906042150029 Anil vermi 180g 23 0
8906007289139 Fort. Atta 1kg 107 0
8904505701269 Fort. sunflo pouch 190 0
8908002396331 Mr.gold coco oil 500ml 299 0
8908000974128 Sunland sun oil 114 0
8906007289085 Fort. Atta 5kg 360 0
8901262178792 Amul Fre fries 200g 45 0
8935112200005 Redbull Kratingdaeng 125 0
8901058898354 Nescafe Chilled latte 45 0
4792024019200 Maggi coco milk p 100g 149 0
89080658 Maggi ketchup 190g 70 0
4792024016476 Maggi coco milk 180ml 80 0
89080450 Maggi Sauce 190g 75 0
89080276 Nes. Sunrise 45g 170 0
8901058013658 Maggi Hot&Swe Sau 500g 122 0
8901058903959 MilkMaid 380g 149 0
89009758 Nes. Classic 24g 124 0
89080474 Nes. Iced Frappe 50 0
8901058011746 Maggi Sauce 485g 113 0
89009949 Nes. Classic 45g 235 0
8901058026283 Munch Chocofil 10 0
8901058002294 Maggi Spi man 61g 25 0
8901058030792 Maggi Veg Atta 55g 20 0
8901058003017 MaggiPazzta 69g 35 0
8901058006032 Maggi Chilly cuppa 55 0
8901058006025 Maggi masala cuppa 55 0
8901058002270 Maggi Spi gar 61g 25 0
4792024019224 Maggi coco milk p 25g 39 0
8901058006148 Maggi Chi nood 20 0`,

13: `8901058016222 Maggi Pichkoo 75g 15 0
8901058019872 Everyday milk po 400g 255 0
8901058021950 MilkMaid 190g 84 0
8901058030778 Everyday milk po 15g 10 0
8901058006124 Maggi Chi nood 304g 80 0
8901058002997 MaggiPazzta mus69g 35 0
8901058003079 MaggiPazzta che&to 69g 35 0
8901058012651 Maggi Hot&Swe Sau 75g 22 0
8901058031232 Everyday milk po 200g 129 0
8901058003000 MaggiPazzta che69g 35 0
89080795 Maggi Magic Mas 5 0
8901058002676 Maggi Spi man 244g 100 0
8901058023800 Maggi 600g 116 0
8901058010565 Maggi 450g 87 0
8901058005790 Maggi Special 300g 100 0
8901058017670 Maggi 300g 58 0
8901058022223 Maggi Veg Atta 290g 108 0`,

14: `8901207051173 Dabur Honey 250g 125 0
8901888090348 Real orange 1L 125 0
8901396052005 Cherry Polish 15g 52 0
8901888030351 Real Pineapp 1L 135 0
8901207004421 Real Pomo 1L 122 0
8901888000347 Real Cranbe 1L 140 0
8901207033735 Odonil Citrus 220ml 169 0
8901207004407 Real Guava 1L 112 0
8901207034046 Odonil Sand 220ml 169 0
8901287100013 Myso. soap 75g 38 0
8901207014147 Home. coco milk 89 0
8901207004414 Real Litchi1L 120 0
8901287208498 Myso. Kleenol 1L 130 0
8901157025200 Hit Anti roa 400ml 195 0
8901396323372 Dettol Hwash 99 0
8901207021220 Real Apple 1L 108 0
8901207033704 Odonil Rose 220ml 169 0
8901314823304 Colg Max Mwash 88 0
8850006962480 Colg Max Paste10r 10 0
8901396476146 Colin 500ml 120 0
8901012166635 Stayfree XL 6P 45 0
8901207025372 Dabur Honey 500G 250 0
8901207027321 Dabur Red 200g 141 0
8901396350309 DettolAntiseptic 250ml 159 0
8901396051008 Cherry Polish 40g 98 0
8901396354604 DettolAntiseptic 550ml 267.09 0
8901440013082 East. chic mas 50g 35 0
8901207033209 Dabur Mesw. 100g 72 0
8901440013037 East. Sam pow 50g 36 0
8901314695543 Colg Max Paste 81g 70 0
8901396122500 Lizol Jas 500ml 129 0
8901023025082 Aer Power poc 10g 70 0
8901314916990 Colg. Paste 110g 73 0
8901396112501 Lizol Sand 500ml 129 0
8901396602316 Dettol Icy cool 100g 40 0`
};

// Category mapping helper
function suggestCategory(desc, rawBarcode) {
    const d = desc.toLowerCase();
    
    // Baby Care
    if (d.includes('pamper') || d.includes('baby') || d.includes('feedingbottle') || d.includes('nipple') || d.includes('bheem pants') || d.includes('himalaya pants') || d.includes('himal. pants')) {
        return 'Baby Care';
    }
    // Pet Care
    if (d.includes('pedigree') || d.includes('drools') || d.includes('whishas') || d.includes('dog adult')) {
        return 'Pet Food & Care';
    }
    // Personal Care & Hygiene
    if (d.includes('whisper') || d.includes('stayfree') || d.includes('gillette') || d.includes('gillete') || d.includes('shaving') || d.includes('shampo') || d.includes('conditio') || d.includes('facwash') || d.includes('facewash') || d.includes('bleach') || d.includes('moisturiser') || d.includes('veet') || d.includes('hairremoval') || d.includes('haircolou') || d.includes('garni') || d.includes('indica') || d.includes('goorej') || d.includes('deospary') || d.includes('engage') || d.includes('deo') || d.includes('razor') || d.includes('oral b') || d.includes('colg') || d.includes('paste') || d.includes('mwash') || d.includes('dabur red') || d.includes('dabur mesw') || d.includes('soap') || d.includes('hwash') || d.includes('dettol') || d.includes('buds') || d.includes('gohnso') || d.includes('amla oil') || d.includes('almond.oil') || d.includes('jasmin,oil') || d.includes('gulabari') || d.includes('dabu,badam') || d.includes('hair') || d.includes('blackrose') || d.includes('parkavenue')) {
        return 'Personal Care & Hygiene';
    }
    // Health & Wellness / First Aid
    if (d.includes('iodex') || d.includes('moov') || d.includes('zandu') || d.includes('amrutajan') || d.includes('amruta') || d.includes('vicks') || d.includes('itchguard') || d.includes('boroplus') || d.includes('ors,') || d.includes('woodwards') || d.includes('hajmol') || d.includes('dettolantiseptic')) {
        return 'Personal Care & Hygiene';
    }
    // Household Cleaning & Essentials
    if (d.includes('tide') || d.includes('cleaner') || d.includes('odonil') || d.includes('odonliu') || d.includes('hit anti') || d.includes('lizol') || d.includes('colin') || d.includes('kleenol') || d.includes('mortein') || d.includes('mach,box') || d.includes('homelight') || d.includes('agarbathi') || d.includes('camphor') || d.includes('broom') || d.includes('floorclean') || d.includes('floor wash') || d.includes('garbag') || d.includes('alumini') || d.includes('food,wrap') || d.includes('aer power')) {
        return 'Household Cleaning';
    }
    // Stationery & General Merchandise
    if (d.includes('pen') || d.includes('pencil') || d.includes('pescil') || d.includes('marker') || d.includes('camlin') || d.includes('camel') || d.includes('apsara') || d.includes('doms') || d.includes('fevicol') || d.includes('fevi') || d.includes('glue') || d.includes('flexkwik') || d.includes('mcl') || d.includes('sharpener') || d.includes('sharpen') || d.includes('canvas') || d.includes('canv') || d.includes('book') || d.includes('exampad') || d.includes('drawing') || d.includes('paint') || d.includes('crayon') || d.includes('clay') || d.includes('scissors') || d.includes('cutter') || d.includes('staplepin') || d.includes('kangar') || d.includes('kangat') || d.includes('punch') || d.includes('stamp.pad') || d.includes('stickynotes') || d.includes('sticknotes') || d.includes('cell') || d.includes('aaacell') || d.includes('durecell') || d.includes('panasonic') || d.includes('powercell') || d.includes('battery') || d.includes('playingcard') || d.includes('shuttcock') || d.includes('ball') || d.includes('lunch box') || d.includes('waterbottal') || d.includes('peeler') || d.includes('knife') || d.includes('nife') || d.includes('pump') || d.includes('coconuto-pener') || d.includes('oil,dispenser') || d.includes('anti-slipmat') || d.includes('candle') || d.includes('spray') || d.includes('marry,christ') || d.includes('ballon') || d.includes('alfa tissue') || d.includes('tissue') || d.includes('raintop')) {
        return 'Stationery & General Merchandise';
    }
    // Smokers Essentials / Specialty
    if (d.includes('gold ,kings') || d.includes('gold,lights') || d.includes('ices,bust') || d.includes('cls connects') || d.includes('class-') || d.includes('marlboro') || d.includes('america cool') || d.includes('america red') || d.includes('advance marblb')) {
        return 'Stationery & General Merchandise';
    }
    // Frozen Foods
    if (d.includes('froz') || d.includes('forzz') || d.includes('forz') || d.includes('french,fry') || d.includes('burgpatty') || d.includes('potato star') || d.includes('potatstarzz') || d.includes('smile') || d.includes('fryss') || d.includes('alootikk') || d.includes('wedges') || d.includes('fishbread') || d.includes('chicknugg') || d.includes('chicksalami') || d.includes('chickpopcorn') || d.includes('chick,serek') || d.includes('chick,garli') || d.includes('chicksheekebab') || d.includes('tando.chick') || d.includes('fishfillets') || d.includes('naan,fres2go') || d.includes('puffpastry') || d.includes('amul fre fries')) {
        return 'Frozen Foods';
    }
    // Dairy & Refrigerated Foods
    if (d.includes('milky') || d.includes('milk') || d.includes('butter') || d.includes('cheese') || d.includes('paneer') || d.includes('curd') || d.includes('yogurt') || d.includes('yog') || d.includes('ghee') || d.includes('tofu') || d.includes('skyr') || d.includes('shrikhand') || d.includes('mishtidoi') || d.includes('khova') || d.includes('nandhini') || d.includes('everyday milk') || d.includes('milkmaid') || d.includes('fcream') || d.includes('rich cream') || d.includes('cheddar') || d.includes('mozzarella')) {
        return 'Dairy & Refrigerated Foods';
    }
    // Chocolates & Confectionery
    if (d.includes('chocolate') || d.includes('choclat') || d.includes('cholot') || d.includes('dairymilk') || d.includes('daiymilk') || d.includes('dm,') || d.includes('d.m') || d.includes('5star') || d.includes('milkybar') || d.includes('munch') || d.includes('bar-one') || d.includes('barone') || d.includes('kit-kat') || d.includes('kitkat') || d.includes('snickers') || d.includes('tobleron') || d.includes('ferrero') || d.includes('ferro') || d.includes('lindor') || d.includes('galaxy') || d.includes('bounty') || d.includes('bournvil') || d.includes('bournille') || d.includes('kinder') || d.includes('chocopiee') || d.includes('fuse') || d.includes('lickables') || d.includes('temptations') || d.includes('skittles') || d.includes('gems') || d.includes('tictac') || d.includes('centerfresh') || d.includes('boomer') || d.includes('double mint') || d.includes('llollipo') || d.includes('lollipops') || d.includes('lollipos') || d.includes('jelly') || d.includes('marshmellow') || d.includes('asal coco ladu')) {
        return 'Chocolates & Confectionery';
    }
    // Biscuits, Bakery & Rusk
    if (d.includes('rusk') || d.includes('biscuit') || d.includes('biscuti') || d.includes('biscui') || d.includes('cookies') || d.includes('monaco') || d.includes('krack jack') || d.includes('parle-g') || d.includes('parle') || d.includes('marie gold') || d.includes('milk bikis') || d.includes('croissant') || d.includes('gobbles') || d.includes('timepass') || d.includes('good cas') || d.includes('good cho') || d.includes('good but') || d.includes('golmaal') || d.includes('nutri') || d.includes('treat vani') || d.includes('jimjam') || d.includes('mas chas') || d.includes('50-50') || d.includes('bourbo') || d.includes('hide & seek') || d.includes('rikrak') || d.includes('monetta wafers') || d.includes('wafer') || d.includes('oreo') || d.includes('perero sticks') || d.includes('plumcake') || d.includes('sugar free,cookies')) {
        return 'Biscuits, Bakery & Rusk';
    }
    // Snacks, Chips & Namkeen
    if (d.includes('lay') || d.includes('lays') || d.includes('dorito') || d.includes('kurkur') || d.includes('cheetos') || d.includes('nacho') || d.includes('chips') || d.includes('soyastick') || d.includes('koduba') || d.includes('panchratan') || d.includes('allinone') || d.includes('khattmeeta') || d.includes('khattameet') || d.includes('tastnuts') || d.includes('aloo bhujia') || d.includes('moongdal') || d.includes('monngdal') || d.includes('dryfruitmix') || d.includes('navratan') || d.includes('bhakawadi') || d.includes('saltpeanut') || d.includes('soyachips') || d.includes('minisamosaa') || d.includes('buttermurukk') || d.includes('bhujisev') || d.includes('briyas peanut') || d.includes('peanut') || d.includes('safari crunch') || d.includes('pista')) {
        return 'Snacks, Chips & Namkeen';
    }
    // Tea, Coffee & Beverages
    if (d.includes('tea') || d.includes('coff') || d.includes('nescaf') || d.includes('water') || d.includes('bisler') || d.includes('soda') || d.includes('pepsi') || d.includes('cocacola') || d.includes('thumbsup') || d.includes('sprite') || d.includes('7up') || d.includes('redbull') || d.includes('red,bul') || d.includes('rum energy') || d.includes('tonic.water') || d.includes('juice') || d.includes('real orange') || d.includes('real pineapp') || d.includes('real pomo') || d.includes('real cranbe') || d.includes('real guava') || d.includes('real litchi') || d.includes('real apple') || d.includes('tang') || d.includes('bubble,tea') || d.includes('o`cean') || d.includes('geks') || d.includes('milo') || d.includes('frappe') || d.includes('sunrise') || d.includes('iced frappe') || d.includes('chilled latte')) {
        return 'Tea, Coffee & Beverages';
    }
    // Oils, Vinegar & Condiments
    if (d.includes('oil') || d.includes('must.oil') || d.includes('sunfl.oil') || d.includes('sunflo') || d.includes('coco oil') || d.includes('coconutoil') || d.includes('ging oil') || d.includes('vinegar') || d.includes('ving') || d.includes('vineg') || d.includes('ketchup') || d.includes('sauce') || d.includes('sau') || d.includes('pichkoo') || d.includes('schez,chutney') || d.includes('pickle') || d.includes('honey') || d.includes('syrup') || d.includes('kewra')) {
        return 'Oils, Vinegar & Condiments';
    }
    // Spices, Masalas & Seasonings
    if (d.includes('pow') || d.includes('masal') || d.includes('season') || d.includes('salt') || d.includes('herb') || d.includes('thyme') || d.includes('oregano') || d.includes('basil') || d.includes('rosemary') || d.includes('lemogress') || d.includes('piri-piri') || d.includes('curry') || d.includes('turm') || d.includes('turmeric') || d.includes('chilli') || d.includes('cumin') || d.includes('garam') || d.includes('corian') || d.includes('pepper') || d.includes('sambar') || d.includes('rasam') || d.includes('biriyani') || d.includes('cinnamonstick') || d.includes('magic mas')) {
        return 'Spices, Masalas & Seasonings';
    }
    // Staples, Rice & Grains
    if (d.includes('rice') || d.includes('atta') || d.includes('maida') || d.includes('rava') || d.includes('pohaa') || d.includes('poha') || d.includes('vermi') || d.includes('oats') || d.includes('oasts') || d.includes('gram flo') || d.includes('jaggery') || d.includes('fing mil') || d.includes('cornflacks') || d.includes('spaghetti') || d.includes('soya') || d.includes('anjeer')) {
        return 'Staples, Rice & Grains';
    }
    // Instant Foods & Noodles
    if (d.includes('maggi') || d.includes('magi') || d.includes('pazzta') || d.includes('noodle') || d.includes('cuppa') || d.includes('soup') || d.includes('pasta')) {
        return 'Instant Food';
    }

    return 'General Merchandise';
}

// Brand helper
function extractBrand(desc) {
    const d = desc.toLowerCase();
    if (d.includes('fortune') || d.startsWith('fort.')) return 'Fortune';
    if (d.includes('maggi') || d.includes('magi')) return 'Maggi';
    if (d.includes('brit.') || d.includes('britannia')) return 'Britannia';
    if (d.includes('cadbury') || d.includes('dairymilk') || d.includes('dm,') || d.includes('d.m') || d.includes('5star') || d.includes('bournvil') || d.includes('fuse')) return 'Cadbury';
    if (d.includes('milky') || d.includes('milkymist')) return 'Milky Mist';
    if (d.includes('nestle') || d.includes('nescaf') || d.includes('everyday') || d.includes('milkmaid') || d.includes('munch') || d.includes('bar-one') || d.includes('kitkat') || d.includes('kit-kat') || d.includes('milo')) return 'Nestle';
    if (d.includes('parle')) return 'Parle';
    if (d.includes('amul')) return 'Amul';
    if (d.includes('haldiram') || d.startsWith('hr,')) return "Haldiram's";
    if (d.includes('lays') || d.includes('lay ') || d.includes('kurkur') || d.includes('dorito') || d.includes('cheetos')) return 'Frito-Lay';
    if (d.includes('gillette') || d.includes('gillete') || d.includes('oral b') || d.includes('whisper') || d.includes('pampers') || d.includes('pamper') || d.includes('tide') || d.includes('ambipur') || d.includes('old spice')) return 'Procter & Gamble';
    if (d.includes('dabur') || d.includes('odonil') || d.includes('gulabari')) return 'Dabur';
    if (d.includes('dettol') || d.includes('lizol') || d.includes('colin') || d.includes('cherry polish') || d.includes('veet')) return 'Reckitt';
    if (d.includes('colgate') || d.includes('colg')) return 'Colgate';
    if (d.includes('camlin') || d.includes('camel')) return 'Camlin Kokuyo';
    if (d.includes('ferrero') || d.includes('kinder')) return 'Ferrero';
    if (d.includes('taj') || d.includes('red lab') || d.includes('redlabe') || d.includes('chakar.tea') || d.includes('bru') || d.includes('lifebuoy')) return 'Tata / HUL';
    if (d.includes('real ')) return 'Real';
    if (d.includes('pedigree') || d.includes('whiskas') || d.includes('whishas') || d.includes('snickers') || d.includes('galaxy') || d.includes('bounty') || d.includes('skittles') || d.includes('boomer')) return 'Mars Wrigley';
    if (d.includes('sakthi') || d.startsWith('sakt.')) return 'Sakthi';
    if (d.includes('annapoorna') || d.startsWith('anna.')) return 'Annapoorna';
    if (d.includes('anil')) return 'Anil';
    if (d.includes('kohinoor') || d.includes('kohi.')) return 'Kohinoor';
    if (d.includes('mccain') || d.startsWith('mac,')) return 'McCain';
    if (d.includes('godrej') || d.includes('goorej') || d.includes('aer power')) return 'Godrej';
    return null;
}

// Clean title formatter
function cleanTitle(desc) {
    let t = desc.trim();
    t = t.replace(/,/g, ' ');
    t = t.replace(/\bDM\b/gi, 'Dairy Milk');
    t = t.replace(/\bD\.M\b/gi, 'Dairy Milk');
    t = t.replace(/\bHR\b/gi, "Haldiram's");
    t = t.replace(/\bBrit\b/gi, 'Britannia');
    t = t.replace(/\bAnna\b/gi, 'Annapoorna');
    t = t.replace(/\bSakt\b/gi, 'Sakthi');
    t = t.replace(/\bFort\b/gi, 'Fortune');
    t = t.replace(/\bKohi\b/gi, 'Kohinoor');
    t = t.replace(/\bMac\b/gi, 'McCain');
    t = t.replace(/\bpow\b/gi, 'Powder');
    t = t.replace(/\bmasal\b/gi, 'Masala');
    t = t.replace(/\bseason\b/gi, 'Seasoning');
    t = t.replace(/\bseasoni\b/gi, 'Seasoning');
    t = t.replace(/\bcholot\b/gi, 'Chocolate');
    t = t.replace(/\bchololet\b/gi, 'Chocolate');
    t = t.replace(/\bchick\b/gi, 'Chicken');
    t = t.replace(/\bpoto\b/gi, 'Potato');
    t = t.replace(/\bfroz\b/gi, 'Frozen');
    t = t.replace(/\bforzz\b/gi, 'Frozen');
    t = t.replace(/\bforz\b/gi, 'Frozen');
    t = t.replace(/\bving\b/gi, 'Vinegar');
    t = t.replace(/\bvineg\b/gi, 'Vinegar');
    t = t.replace(/\bcoffpow\b/gi, 'Coffee Powder');
    t = t.replace(/\bcoff\b/gi, 'Coffee');
    t = t.replace(/\bbiscui\b/gi, 'Biscuit');
    t = t.replace(/\bbiscuti\b/gi, 'Biscuit');
    t = t.replace(/\bshampo\b/gi, 'Shampoo');
    t = t.replace(/\bconditio\b/gi, 'Conditioner');
    t = t.replace(/\bfacwash\b/gi, 'Face Wash');
    t = t.replace(/\bcolg\b/gi, 'Colgate');
    t = t.replace(/\bhwash\b/gi, 'Handwash');
    t = t.replace(/\bspary\b/gi, 'Spray');
    t = t.replace(/\bflak\b/gi, 'Flakes');
    t = t.replace(/\bparachut\b/gi, 'Parachute');
    t = t.replace(/\bsope\b/gi, 'Soap');
    t = t.replace(/\bmushro\b/gi, 'Mushroom');
    t = t.replace(/\bpanpiur\b/gi, 'Pani Puri');
    t = t.replace(/\bpast\b/gi, 'Paste');
    t = t.replace(/\bwhit\b/gi, 'White');
    t = t.replace(/\braspbrry\b/gi, 'Raspberry');
    t = t.replace(/\bpomegrant\b/gi, 'Pomegranate');
    t = t.replace(/\bhazenut\b/gi, 'Hazelnut');
    t = t.replace(/\bpescil\b/gi, 'Pencil');
    t = t.replace(/\bgule\b/gi, 'Glue');
    t = t.replace(/\bscal\b/gi, 'Scale');
    t = t.replace(/\bbuttermurukk\b/gi, 'Butter Murukku');
    t = t.replace(/\bmonngdal\b/gi, 'Moong Dal');
    t = t.replace(/\bminisamosaa\b/gi, 'Mini Samosa');
    t = t.replace(/\bkhattameet\b/gi, 'Khatta Meetha');
    t = t.replace(/\bkhattmeeta\b/gi, 'Khatta Meetha');
    t = t.replace(/\bpanchratamix\b/gi, 'Panchratan Mix');
    t = t.replace(/\bpanchratanmix\b/gi, 'Panchratan Mix');
    t = t.replace(/\bnavratanmix\b/gi, 'Navratan Mix');
    t = t.replace(/\ballinonemix\b/gi, 'All in One Mix');
    t = t.replace(/\bmilkmaid\b/gi, 'Milkmaid');
    t = t.replace(/\bfcream\b/gi, 'Fresh Cream');
    t = t.replace(/\bsoya\b/gi, 'Soya Chunks');

    t = t.replace(/\s+/g, ' ').trim();
    return t.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Generate URL slug from name
function generateSlug(name, barcode, index) {
    let s = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    if (!s) s = 'product';
    if (barcode) {
        s += `-${barcode}`;
    } else {
        s += `-item-${index}`;
    }
    return s;
}

// Main parser function
function parseAllPages() {
    const rawRows = [];
    const barcodeCounts = {};

    for (let pageNum = 1; pageNum <= 14; pageNum++) {
        const text = pages[pageNum];
        if (!text) continue;
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        
        for (const line of lines) {
            rawRows.push({
                page: pageNum,
                rawLine: line
            });
        }
    }

    console.log(`Total raw extracted rows across 14 pages: ${rawRows.length}`);

    const parsedRecords = [];

    rawRows.forEach((r, idx) => {
        const line = r.rawLine;
        if (line.toLowerCase().startsWith('barcode') && line.toLowerCase().includes('description')) {
            return;
        }

        const tokens = line.split(/\s+/);
        let barcode = '';
        let desc = '';
        let price = 0;
        let gst = 0;
        let validationNotes = [];
        let importStatus = 'VALID';

        if (tokens.length === 1) {
            barcode = tokens[0];
            desc = '';
            price = 0;
            gst = 0;
            validationNotes.push('Incomplete row: missing description, price, and GST');
            importStatus = 'INVALID_INCOMPLETE';
        } else if (tokens.length === 2) {
            barcode = tokens[0];
            desc = tokens[1];
            price = 0;
            gst = 0;
            validationNotes.push('Incomplete row: missing price and GST');
            importStatus = 'INVALID_INCOMPLETE';
        } else {
            const lastToken = tokens[tokens.length - 1];
            const secondLastToken = tokens[tokens.length - 2];

            if (!isNaN(Number(lastToken)) && !isNaN(Number(secondLastToken))) {
                gst = parseFloat(lastToken);
                price = parseFloat(secondLastToken);
                desc = tokens.slice(1, tokens.length - 2).join(' ');
                barcode = tokens[0];
            } else if (!isNaN(Number(lastToken))) {
                if (/^[A-Za-z0-9_-]+$/.test(tokens[0]) && (tokens[0].length >= 4 || tokens[0] === '1')) {
                    price = parseFloat(lastToken);
                    gst = 0;
                    desc = tokens.slice(1, tokens.length - 1).join(' ');
                    barcode = tokens[0];
                    validationNotes.push('GST value missing in source row; defaulted to 0');
                } else {
                    price = parseFloat(lastToken);
                    desc = tokens.slice(0, tokens.length - 1).join(' ');
                    barcode = '';
                    validationNotes.push('Missing barcode in source row');
                    importStatus = 'INVALID_MISSING_BARCODE';
                }
            } else {
                desc = line;
                barcode = '';
                validationNotes.push('Unrecognized row format');
                importStatus = 'INVALID_UNRECOGNIZED';
            }
        }

        if (tokens.length >= 3 && !barcode && !isNaN(Number(tokens[tokens.length - 1])) && !isNaN(Number(tokens[tokens.length - 2]))) {
            gst = parseFloat(tokens[tokens.length - 1]);
            price = parseFloat(tokens[tokens.length - 2]);
            desc = tokens.slice(0, tokens.length - 2).join(' ');
            barcode = '';
            validationNotes.push('Missing barcode in source row');
            importStatus = 'INVALID_MISSING_BARCODE';
        }

        if (barcode && barcode.startsWith('A') && barcode.endsWith('A') && barcode.length > 5) {
            validationNotes.push(`Enclosing letters detected on barcode '${barcode}'; preserved original in notes`);
        }

        if (barcode) {
            if (/^\d{12,14}$/.test(barcode)) {
                // Standard EAN-13, EAN-14, UPC-12
            } else if (/^\d{8}$/.test(barcode)) {
                validationNotes.push('EAN-8 short barcode format');
            } else if (/^\d{1,5}$/.test(barcode)) {
                validationNotes.push(`Internal store SKU / short code (${barcode})`);
                if (importStatus === 'VALID') importStatus = 'REVIEW_REQUIRED_NON_STANDARD_BARCODE';
            } else if (!/^\d+$/.test(barcode)) {
                validationNotes.push(`Alphanumeric identifier / ASIN code (${barcode})`);
                if (importStatus === 'VALID') importStatus = 'REVIEW_REQUIRED_NON_STANDARD_BARCODE';
            }
        }

        if (isNaN(price) || price <= 0) {
            if (importStatus === 'VALID') {
                importStatus = 'INVALID_PRICE';
                validationNotes.push(`Invalid price: ${price}`);
            }
        }

        if (barcode) {
            barcodeCounts[barcode] = (barcodeCounts[barcode] || 0) + 1;
        }

        const cleanName = desc ? cleanTitle(desc) : 'Untitled Product';
        const suggestedCat = desc ? suggestCategory(desc, barcode) : 'General Merchandise';
        const brand = desc ? extractBrand(desc) : null;

        parsedRecords.push({
            rowId: idx + 1,
            page: r.page,
            barcode: barcode || null,
            originalDescription: desc,
            cleanDisplayName: cleanName,
            brand: brand,
            price: price,
            gst: gst,
            suggestedCategory: suggestedCat,
            slug: generateSlug(cleanName, barcode, idx + 1),
            importStatus: importStatus,
            validationNotes: validationNotes
        });
    });

    parsedRecords.forEach(rec => {
        if (rec.barcode && barcodeCounts[rec.barcode] > 1) {
            rec.validationNotes.push(`Duplicate barcode detected: appears ${barcodeCounts[rec.barcode]} times in inventory`);
            if (rec.importStatus === 'VALID' || rec.importStatus === 'REVIEW_REQUIRED_NON_STANDARD_BARCODE') {
                rec.importStatus = 'REVIEW_REQUIRED_DUPLICATE_BARCODE';
            }
        }
    });

    return { parsedRecords, barcodeCounts };
}

const { parsedRecords, barcodeCounts } = parseAllPages();

const summary = {
    totalExtractedRows: parsedRecords.length,
    validRows: parsedRecords.filter(r => r.importStatus === 'VALID').length,
    duplicateCandidateRows: parsedRecords.filter(r => r.importStatus === 'REVIEW_REQUIRED_DUPLICATE_BARCODE').length,
    nonStandardBarcodeRows: parsedRecords.filter(r => r.importStatus === 'REVIEW_REQUIRED_NON_STANDARD_BARCODE').length,
    invalidIncompleteRows: parsedRecords.filter(r => r.importStatus === 'INVALID_INCOMPLETE').length,
    missingBarcodeRows: parsedRecords.filter(r => r.importStatus === 'INVALID_MISSING_BARCODE').length,
    uniqueBarcodes: Object.keys(barcodeCounts).length,
    categoriesIdentified: {}
};

parsedRecords.forEach(r => {
    summary.categoriesIdentified[r.suggestedCategory] = (summary.categoriesIdentified[r.suggestedCategory] || 0) + 1;
});

console.log('=== EXTRACTION SUMMARY ===');
console.log(JSON.stringify(summary, null, 2));

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const jsonPath = path.join(dataDir, 'inventory_staging.json');
fs.writeFileSync(jsonPath, JSON.stringify(parsedRecords, null, 2), 'utf8');
console.log(`Saved JSON staging dataset to ${jsonPath}`);

const csvHeaders = ['RowID', 'Page', 'Barcode', 'OriginalDescription', 'CleanDisplayName', 'Brand', 'PriceINR', 'GST', 'SuggestedCategory', 'ImportStatus', 'ValidationNotes'];
const csvLines = [csvHeaders.join(',')];

parsedRecords.forEach(r => {
    const row = [
        r.rowId,
        r.page,
        `"${(r.barcode || '').replace(/"/g, '""')}"`,
        `"${(r.originalDescription || '').replace(/"/g, '""')}"`,
        `"${(r.cleanDisplayName || '').replace(/"/g, '""')}"`,
        `"${(r.brand || '').replace(/"/g, '""')}"`,
        r.price,
        r.gst,
        `"${(r.suggestedCategory || '').replace(/"/g, '""')}"`,
        r.importStatus,
        `"${r.validationNotes.join('; ').replace(/"/g, '""')}"`
    ];
    csvLines.push(row.join(','));
});

const csvPath = path.join(dataDir, 'inventory_staging.csv');
fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf8');
console.log(`Saved CSV staging dataset to ${csvPath}`);

const summaryPath = path.join(dataDir, 'extraction_summary.json');
fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
console.log(`Saved extraction summary to ${summaryPath}`);
