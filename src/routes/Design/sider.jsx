import React, { PureComponent, Fragment } from 'react';
import { Layout, Collapse, Tooltip } from 'antd'
import classnames from 'classnames'
import _find from 'lodash/find'
import TemplateMaps from '@/design/templates'
import { uniqueId } from '@/utils'

const { Sider } = Layout;
const { Panel } = Collapse

// 模块 icon 这里不是很合理
const ICONS = {
  text: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M919.501863 0l12.152847 260.550506h-36.404045q-24.251197-127.250665-72.699095-163.491219-42.45322-36.349548-175.698563-36.349548H562.001064v793.586376q0 84.960937 24.196701 108.994146 30.300373 24.305695 127.250665 30.300372v30.300373H259.106333v-30.300373q96.841299-5.994678 121.146993-36.349547c16.349122-12.152847 24.251197-52.426184 24.251198-121.20149V60.600745H319.652581q-133.354337 0-175.698563 36.349548-48.556892 36.349548-72.699095 163.491218H34.905375L47.003725 0h872.498138z" p-id="4276" /><path d="M984.625865 645.517829l4.46876 96.296327h-13.460777q-8.992017-47.030974-26.867057-60.49175-15.695157-13.460777-64.960511-13.460777H852.361469v293.357743q0 31.390314 8.93752 40.327834 11.1719 8.992017 47.030974 11.226397v11.226397h-167.796488v-11.226397q35.804577-2.23438 44.796594-13.460777c5.940181-4.46876 8.93752-19.400958 8.93752-44.796594v-286.654603h-31.335817q-49.047366 0-64.960511 13.460777-17.929537 13.460777-26.867057 60.49175h-13.40628l4.46876-96.296327h322.513678z" p-id="4277" /></svg>),
  singleImg: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M769.495771 282.296686c-37.308343 0-67.552914 30.226286-67.552914 67.518171 0 37.310171 30.244571 67.552914 67.552914 67.552914 37.310171 0 67.483429-30.244571 67.483429-67.552914C836.981029 312.522971 806.807771 282.296686 769.495771 282.296686z" p-id="17082" /><path d="M5.485714 106.415543l0 503.3344 0 239.550171 0 67.552914 67.536457 0 877.937371 0L1018.514286 916.853029l0-67.552914 0-78.085486L1018.514286 106.415543 5.485714 106.415543zM768.437029 521.120914l-151.431314 151.413029-337.170286-337.152L39.2448 575.972571 39.2448 140.192914l945.492114 0 0 597.246171L768.437029 521.120914z" p-id="17083" /></svg>),
  multiImg: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M915.2 280.4l-165-8-9.6-107.6c-2-22.6-22.2-38.4-45.8-36.6L102.8 176.8c-23.6 2-40.6 21-38.8 43.4l42.4 471.6c2 22.6 22.4 38.4 45.8 36.6l30-2.4-4.8 91.6c-1.2 25.2 18.4 45.6 44.8 47L882.6 896c26.4 1.2 48.2-17.2 49.6-42.4L960 327C961.2 302 941.4 281.6 915.2 280.4zM205.2 291l-14.2 269.6L156.2 610l-32-356c0-0.4 0-0.6 0-1s0-0.6 0-1c1-10 8.6-18 19-18.8l522-42.8c10.4-0.8 19.4 6 21 15.8 0 0.4 0.6 0.4 0.6 0.8 0 0.2 0.6 0.4 0.6 0.8l5.4 61.6-438-21C228.4 247.6 206.4 266 205.2 291zM873.4 764.8l-93.4-110.6-55-65.4c-4.8-5.8-12.6-10.6-21.2-11-8.6-0.4-15 3-22.2 8.2l-32.8 23.8c-7 4.2-12.4 7-19.8 6.6-7.2-0.4-13.6-3.2-18.2-7.6-1.6-1.6-4.6-4.4-7-6.8l-85.6-97.8c-6.2-7.8-16.4-12.8-27.6-13.4-11.4-0.6-22.4 4.2-29.6 11.2L258.8 719.6l-13.6 14.8 0.6-13.6 13.6-257.8 6.6-125.8c0-0.4 0-0.8 0-1 0-0.4 0-0.8 0-1 2.8-10.8 12.4-18.6 23.8-18l408.4 19.6 57.4 2.8 116.6 5.6c11.6 0.6 20.6 9.4 20.8 20.4 0 0.4 0.6 0.6 0.6 1 0 0.4 0.6 0.6 0.6 1L873.4 764.8zM746.4 524.6c38.8 0 70.4-31.6 70.4-70.4s-31.4-70.4-70.4-70.4c-38.8 0-70.4 31.4-70.4 70.4S707.4 524.6 746.4 524.6z" p-id="7163" /></svg>),
  goodCard: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 512c-109.6 0-201.1-79.1-220.3-183.3 12.8-9 21.2-23.9 21.2-40.7 0-27.5-22.3-49.8-49.8-49.8-27.5 0-49.8 22.3-49.8 49.8 0 19.9 11.7 37.1 28.6 45.1 21.6 129.6 134.4 228.7 270 228.7s248.5-99.1 270-228.7a49.69 49.69 0 0 0 28.6-45.1c0-27.5-22.3-49.8-49.8-49.8-27.5 0-49.8 22.3-49.8 49.8 0 16.8 8.4 31.7 21.2 40.7C713.1 432.9 621.6 512 512 512zM860.4 64H658.2c0 0.1 0 0.1 0.1 0.2-12.3 1.5-21.8 12-21.8 24.7s9.5 23.2 21.8 24.7c0 0.1 0 0.1-0.1 0.2h202.2c27.4 0 49.8 22.3 49.8 49.8v696.9c0 27.4-22.3 49.8-49.8 49.8H163.6c-27.4 0-49.8-22.3-49.8-49.8V163.6c0-27.4 22.3-49.8 49.8-49.8H341c0-0.1 0-0.1-0.1-0.2 12.3-1.5 21.8-12 21.8-24.7s-9.5-23.2-21.8-24.7c0-0.1 0-0.1 0.1-0.2H163.5C108.6 64 64 108.7 64 163.6v696.9c0 54.9 44.6 99.6 99.6 99.6h696.9c54.9 0 99.6-44.7 99.6-99.6V163.6c-0.1-55-44.8-99.6-99.7-99.6z m0 0" p-id="45367" /></svg>),
  slideGood: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M885.649481 263.805675 605.413878 263.805675c-17.224179 0-31.139992-13.94987-31.139992-31.139992 0-17.184041 13.915813-31.133911 31.139992-31.133911L885.649481 201.531773c17.218097 0 31.139992 13.94987 31.139992 31.133911C916.789473 249.855805 902.867579 263.805675 885.649481 263.805675L885.649481 263.805675zM885.649481 419.493473 605.413878 419.493473c-17.224179 0-31.139992-13.94987-31.139992-31.139992 0-17.184041 13.915813-31.133911 31.139992-31.133911L885.649481 357.21957c17.218097 0 31.139992 13.94987 31.139992 31.133911C916.789473 405.543603 902.867579 419.493473 885.649481 419.493473L885.649481 419.493473zM885.649481 668.595166 605.413878 668.595166c-17.224179 0-31.139992-13.921895-31.139992-31.139992 0-17.218097 13.915813-31.133911 31.139992-31.133911L885.649481 606.321263c17.218097 0 31.139992 13.915813 31.139992 31.133911C916.789473 654.673271 902.867579 668.595166 885.649481 668.595166L885.649481 668.595166zM885.649481 824.282963 605.413878 824.282963c-17.224179 0-31.139992-13.921895-31.139992-31.139992 0-17.218097 13.915813-31.133911 31.139992-31.133911L885.649481 762.009061c17.218097 0 31.139992 13.915813 31.139992 31.133911C916.789473 810.361069 902.867579 824.282963 885.649481 824.282963L885.649481 824.282963zM387.446096 481.767376 200.624388 481.767376C149.120918 481.767376 107.210493 439.85695 107.210493 388.353481L107.210493 201.531773c0-51.50347 41.910425-93.413895 93.413895-93.413895l186.821708 0c51.50347 0 93.413895 41.910425 93.413895 93.413895l0 186.821708C480.859991 439.85695 438.949565 481.767376 387.446096 481.767376L387.446096 481.767376zM200.624388 170.39178c-17.157282 0-31.139992 13.98271-31.139992 31.139992l0 186.821708c0 17.157282 13.98271 31.139992 31.139992 31.139992l186.821708 0c17.157282 0 31.139992-13.98271 31.139992-31.139992L418.586088 201.531773c0-17.157282-13.98271-31.139992-31.139992-31.139992L200.624388 170.39178 200.624388 170.39178zM387.446096 917.696858 200.624388 917.696858C149.120918 917.696858 107.210493 875.781568 107.210493 824.282963L107.210493 637.455173c0-51.498604 41.910425-93.413895 93.413895-93.413895l186.821708 0c51.50347 0 93.413895 41.915291 93.413895 93.413895l0 186.82779C480.859991 875.781568 438.949565 917.696858 387.446096 917.696858L387.446096 917.696858zM200.624388 606.321263c-17.157282 0-31.139992 13.948654-31.139992 31.133911l0 186.82779c0 17.185257 13.98271 31.133911 31.139992 31.133911l186.821708 0c17.157282 0 31.139992-13.948654 31.139992-31.133911L418.586088 637.455173c0-17.185257-13.98271-31.133911-31.139992-31.133911L200.624388 606.321263 200.624388 606.321263zM200.624388 606.321263" p-id="50208" /></svg>),
  pointShop: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M787.62786 263.583329l0.247049-0.100252-42.234629 0-4.618741 0-110.130126 0-48.758154 0-136.743385 0-48.758154 0L281.882853 263.483077 239.451301 263.483077c0 0-27.168224-0.880783-27.168224 28.697063l0 192.125315c0 23.408783 8.940308 44.576224 23.201119 60.913678l0 206.41835c0 25.675189 20.791497 46.491748 46.398657 46.491748l463.757427 0c25.660867 0 46.405818-20.816559 46.405818-46.491748l0-206.41835c14.257231-16.337455 23.197538-37.504895 23.197538-60.913678L815.243636 299.222825c-0.304336-1.582545-0.454713-3.723636-0.454713-6.942434C814.792503 262.727608 787.62786 263.583329 787.62786 263.583329L787.62786 263.583329zM444.194014 309.971245l139.149427 0 0 151.072224c0 38.536056-31.135329 69.746573-69.553231 69.746573-38.417902 0-69.596196-31.214098-69.596196-69.746573L444.194014 309.971245 444.194014 309.971245zM258.631608 461.047049 258.631608 309.971245l69.606937 0 69.596196 0 0 151.072224c0 38.536056-31.185455 69.746573-69.596196 69.746573C289.820643 530.793622 258.631608 499.579524 258.631608 461.047049L258.631608 461.047049zM745.64386 705.120671c0 25.675189-20.73779 46.513231-46.348531 46.513231L328.242126 751.633902c-25.614322 0-46.355692-20.838042-46.355692-46.513231l0-131.136448c7.429371 1.937007 15.120112 3.297566 23.154573 3.297566l46.402238 0c27.866406 0 52.574881-12.585175 69.596196-32.066238 16.974769 19.481063 41.683245 32.066238 69.553231 32.066238l46.352112 0c27.862825 0 52.574881-12.585175 69.599776-32.066238 17.021315 19.481063 41.676084 32.066238 69.54607 32.066238l46.402238 0c8.038042 0 15.718042-1.360559 23.150993-3.297566L745.64386 705.120671 745.64386 705.120671zM768.844979 461.047049c0 38.536056-31.135329 69.746573-69.553231 69.746573-38.417902 0-69.553231-31.214098-69.553231-69.746573L629.738517 309.971245l69.553231 0 69.553231 0L768.844979 461.047049 768.844979 461.047049zM513.79021 0C232.02193 0 3.58042 228.94993 3.58042 511.437874c0 282.437818 228.44151 511.437874 510.20979 511.437874 281.721734 0 510.20979-229.000056 510.20979-511.437874C1024 228.94993 795.511944 0 513.79021 0L513.79021 0zM513.79021 978.295944c-257.263888 0-465.769622-209.014154-465.769622-466.86165 0-257.868979 208.505734-466.883133 465.769622-466.883133 257.217343 0 465.715916 209.014154 465.715916 466.883133C979.506126 769.28179 771.007552 978.295944 513.79021 978.295944L513.79021 978.295944zM513.79021 978.295944" p-id="46152" /></svg>),
  seckill: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M398.2336 591.5648a9.216 9.216 0 0 0-9.1136-10.6496H162.8672a9.216 9.216 0 0 1-6.5536-15.7184l473.0368-479.0272c6.4-6.4 17.2032-0.9216 15.6672 7.936l-53.6064 330.6496a9.216 9.216 0 0 0 9.216 10.6496h226.2528c8.192 0 12.288 9.8816 6.5024 15.7184l-473.0368 478.976c-6.4 6.4-17.2032 0.9728-15.7184-7.8848l53.6064-330.6496z" p-id="18467" /></svg>),
  gift: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M843.080487 288.129256l-72.387657 0 25.541723-52.674687c9.601682-24.457018 14.634302-47.961338 9.157567-66.592674-6.831592-23.235191-21.673625-42.698474-44.112684-57.852616-21.543665-14.548344-49.377594-24.76094-85.101213-31.223119-3.734044-0.63752-75.055416-12.157901-132.692115 24.417109l-30.154787 26.022677-2.158153 0-30.159904-26.02677c-57.628512-36.572964-128.904859-25.058722-132.283816-24.484647-36.123732 6.532787-63.958684 16.745383-85.501326 31.293727-22.439058 15.154141-37.283138 34.618449-44.11473 57.852616-5.478781 18.631336-0.067538 42.134633 9.850345 66.592674l25.959232 52.674687-72.721255 0c-56.18258 0-117.936039 51.418067-117.936039 106.046245l0 78.577636c0 45.921889 37.480636 94.931093 81.114412 106.071827l0 262.893502c0 54.627155 47.02706 104.72925 103.205547 104.72925l528.186657 0c56.178487 0 106.274442-50.102095 106.274442-104.72925L883.046734 578.823941c44.070728-10.848069 76.68452-59.846016 76.68452-106.071827l0-95.339392C959.736371 322.787614 899.259998 288.129256 843.080487 288.129256zM552.133046 165.571966c2.043542-2.367931 4.134157-4.560876 6.291287-6.593162 29.584806-27.884071 75.978439-32.887015 108.888989-27.26804 28.507264 5.15951 49.592488 12.895705 64.484663 22.951735 12.57848 8.495488 19.794835 17.955954 23.058159 29.057803 2.499937 8.497535-7.199982 37.037545-30.306236 79.005378l-14.053064 25.52535L538.497491 288.25103 538.497491 181.370791 552.133046 165.571966zM269.650393 183.723372c3.264347-11.102872 10.478655-20.566408 23.058159-29.060873 14.909571-10.06831 36.020378-17.800411 65.394383-23.112394 32.083719-5.453199 78.416977-0.435928 107.983363 27.431769 2.15099 2.029216 4.245697 4.222161 6.288217 6.590092l13.44829 15.584953 0 107.09411L315.122027 288.25103l-14.052041-25.52535C277.084713 219.160465 267.340791 191.57827 269.650393 183.723372zM198.055798 841.718467 198.055798 578.823941l0-0.864694 208.756511 0 0 315.812759L248.586658 893.772007C222.653009 893.77303 198.055798 868.420619 198.055798 841.718467zM564.835346 577.960271l0 315.812759L459.485973 893.77303l0-315.812759L564.835346 577.960271zM830.374094 841.718467c0 25.667589-26.650987 52.054563-53.600779 52.054563L617.509009 893.77303l0-315.812759 212.865085 0 0 0.864694L830.374094 841.718467zM907.058614 472.753137c0 21.559015-14.378475 44.432978-30.312376 52.532447L151.746076 525.285584c-17.918092-8.723685-34.80469-32.945343-34.80469-52.532447l0-78.577636c0-22.526039 35.19764-53.371558 65.261353-53.371558l66.585511 0 0 0.12075 526.744819 0 0-0.12075 67.547419 0c35.752272 0 63.978127 19.750833 63.978127 36.604686L907.058614 472.753137z" p-id="19232" /></svg>),
  hotImg: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M967.242 959.996H173.108c-30.961 0.381-56.372-24.407-56.753-55.368 0-0.085 0-0.175-0.005-0.264V606.309H0v-94.313h23.269v70.735h93.082V261.12c0.237-30.961 25.532-55.87 56.498-55.633 0.085 0 0.17 0 0.26 0.005h794.134c30.961-0.385 56.372 24.407 56.753 55.364 0.005 0.09 0.005 0.175 0.005 0.264v643.27c-0.251 30.961-25.554 55.861-56.52 55.606h-0.239z m-8.673-668.157c-1.057-13.574-12.558-23.946-26.164-23.605H535.269v55.041H512v-55.041H207.694c-13.404-0.148-24.797 9.753-26.522 23.041v291.379h74.83v23.578h-74.83v196.887l168.346-196.887h-46.977v-23.578h67.124l67.868-79.359a46.674 46.674 0 0 1 34.044-15.362 45.219 45.219 0 0 1 33.82 14.771l8.781 9.215h21.092v22.118l79.108 83.023a309.607 309.607 0 0 0 8.727 8.059 34.243 34.243 0 0 0 22.297 8.069 38.62 38.62 0 0 0 23.273-9.242l37.888-31.078a40.73 40.73 0 0 1 25.93-11.187 35.151 35.151 0 0 1 25.935 12.186l200.777 209.664-0.636-511.692zM701.644 427.135c-0.211-52.851 42.462-95.863 95.313-96.078h3.709c52.08 2.558 92.23 46.847 89.672 98.927-2.554 52.08-46.848 92.23-98.928 89.667-49.554-2.428-88.776-42.807-89.766-92.413v-0.103zM512 464.844h23.269v-94.308H512v94.308z m0-377.266h-69.812V64h93.082v117.887H512V87.578z m-209.459 0h93.108V64h-93.108v23.578z m-139.62 0h93.082V64h-93.082v23.578zM0 181.887h23.269V87.578H0v94.309z m23.269-94.309h93.082V64H23.269v23.578zM0 323.379h23.269v-94.335H0v94.335z m0 141.465h23.269v-94.308H0v94.308z" p-id="3883" /></svg>),
  swiper: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2176"><path d="M240 704a60.8 60.8 0 1 0 121.6 0 60.8 60.8 0 1 0-121.6 0Z" p-id="2177" /><path d="M444.8 704a60.8 60.8 0 1 0 121.6 0 60.8 60.8 0 1 0-121.6 0Z" p-id="2178" /><path d="M649.6 704a60.8 60.8 0 1 0 121.6 0 60.8 60.8 0 1 0-121.6 0Z" p-id="2179" /><path d="M0 291.2v457.6c0 28.8 25.6 48 48 48h60.8v-48H48V291.2h60.8V243.2H48C19.2 243.2 0 262.4 0 291.2zM976 243.2h-60.8v48h60.8v457.6h-60.8v48h60.8c28.8 0 48-25.6 48-48V291.2c0-28.8-19.2-48-48-48zM835.2 172.8H192c-28.8 0-48 25.6-48 48v601.6c0 28.8 25.6 48 48 48h643.2c28.8 0 48-25.6 48-48V220.8c3.2-28.8-22.4-48-48-48z m0 649.6H192V220.8h643.2V822.4z" p-id="2180" /></svg>),
  noticeCard: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4392"><path d="M768 512a255.2 255.2 0 0 1-75 181l45.25 45.25a320 320 0 0 0 0-452.55L693 331a255.2 255.2 0 0 1 75 181z" p-id="4393" /><path d="M896 512a382.8 382.8 0 0 1-112.47 271.53l45.25 45.25a448 448 0 0 0 0-633.57l-45.25 45.25A382.8 382.8 0 0 1 896 512z" p-id="4394" /><path d="M715.651707 715.650121m-22.627417 22.627417a32 32 0 1 0 45.254834-45.254834 32 32 0 1 0-45.254834 45.254834Z" p-id="4395" /><path d="M806.162728 806.150586m-22.627417 22.627417a32 32 0 1 0 45.254834-45.254834 32 32 0 1 0-45.254834 45.254834Z" p-id="4396" /><path d="M715.64795 308.34505m-22.627417 22.627417a32 32 0 1 0 45.254834-45.254834 32 32 0 1 0-45.254834 45.254834Z" p-id="4397" /><path d="M806.15795 217.83505m-22.627417 22.627417a32 32 0 1 0 45.254834-45.254834 32 32 0 1 0-45.254834 45.254834Z" p-id="4398" /><path d="M544 125.54h-19.33a63.77 63.77 0 0 0-43.82 17.36L292.35 320H128a32 32 0 0 0-32 32v320a32 32 0 0 0 32 32h164.35l188.5 177.1a63.77 63.77 0 0 0 43.82 17.36H544a64.07 64.07 0 0 0 64-64V189.54a64.07 64.07 0 0 0-64-64zM256 656h-96V384h96z m288 178.46h-19.33L320 642.16V381.84l204.67-192.3H544v644.92z" p-id="4399" /></svg>),
  articleCard: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5834"><path d="M662.528 205.312H251.904c-15.36 0-28.16 12.8-28.16 28.16s12.8 28.16 28.16 28.16h410.624c15.36 0 28.16-12.8 28.16-28.16s-12.8-28.16-28.16-28.16zM555.008 478.72H252.416c-15.36 0-28.16 12.8-28.16 28.16s12.8 28.16 28.16 28.16h302.592c15.36 0 28.16-12.8 28.16-28.16s-12.8-28.16-28.16-28.16zM408.576 751.616h-156.16c-15.36 0-28.16 12.8-28.16 28.16s12.8 28.16 28.16 28.16h156.16c15.36 0 28.16-12.8 28.16-28.16-0.512-15.36-12.8-28.16-28.16-28.16z" p-id="5835" /><path d="M923.648 136.704c-43.008-5.632-76.8-8.704-93.696-9.728V91.648c0-33.792-27.648-61.44-61.44-61.44H137.216c-33.792 0-61.44 27.648-61.44 61.44v837.12c0 33.792 27.648 61.44 61.44 61.44h609.792l69.632 10.24s45.568 1.536 62.464-41.984 102.912-748.032 102.912-748.032 4.608-65.536-58.368-73.728zM772.096 919.04c0 8.192-6.656 14.336-14.336 14.336H148.48c-8.192 0-14.336-6.656-14.336-14.336V99.84c0-8.192 6.656-14.336 14.336-14.336h609.28c8.192 0 14.336 6.656 14.336 14.336v819.2z m148.992-679.424l-91.136 666.112V194.56c34.816 2.048 89.088 6.144 92.672 12.8 3.584 6.656-1.536 32.256-1.536 32.256z" p-id="5836" /></svg>),
  coupon: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M360.406 353.438c-9.575-8.223-10.606-22.678-2.361-32.172 8.296-9.554 22.716-10.584 32.282-2.36l121.52 104.505 121.576-104.505c9.512-8.224 23.987-7.193 32.228 2.36 8.239 9.495 7.21 23.95-2.361 32.172L542.68 457.161h105.707c12.597 0 22.896 10.22 22.896 22.854 0 12.641-10.3 22.923-22.896 22.923H534.809v63.983h113.578c12.597 0 22.896 10.22 22.896 22.859 0 12.641-10.3 22.924-22.896 22.924H534.805v71.724c0 12.641-10.296 22.923-22.962 22.923-12.657 0-22.897-10.282-22.897-22.923v-71.724H375.364c-12.661 0-22.957-10.283-22.957-22.924 0-12.64 10.296-22.859 22.957-22.859h113.581v-63.983H375.364c-12.661 0-22.957-10.283-22.957-22.923 0-12.639 10.296-22.854 22.957-22.854H481.01L360.406 353.438z m-39.739 507.097c-12.661 0-22.897-10.279-22.897-22.923 0-12.576 10.232-22.859 22.897-22.859H885.67c6.176 0 11.873-2.658 16.052-6.77 4.239-4.234 6.842-9.979 6.842-16.086v-149.5c-25.5-4.718-48.397-17.176-66.086-34.775l-0.06-0.122c-22.779-22.737-36.894-54.188-36.894-88.839 0-34.653 14.114-66.101 36.894-88.841l0.06-0.118c17.688-17.599 40.586-30.057 66.086-34.775V228.739c0-6.049-2.666-11.733-6.905-15.968-4.238-4.234-9.936-6.896-15.988-6.896H138.028c-6.12 0-11.876 2.602-16.114 6.836l-0.849 0.784c-3.636 4.112-5.938 9.436-5.938 15.243v166.188c25.563 4.718 48.402 17.176 66.09 34.775l0.06 0.118c22.839 22.741 36.953 54.188 36.953 88.841 0 34.65-14.114 66.102-36.953 88.839l-0.06 0.122c-17.688 17.6-40.527 30.058-66.09 34.775v149.495a22.795 22.795 0 0 0 6.663 16.15l0.06 0.059c4.12 4.112 9.877 6.651 16.175 6.651h62.394c12.661 0 22.898 10.283 22.898 22.859 0 12.641-10.237 22.923-22.898 22.923h-62.39c-18.722 0-35.74-7.621-48.219-19.956l-0.246-0.181-0.059-0.061-0.06-0.063c-12.419-12.458-20.172-29.634-20.172-48.382V621.594c0-12.641 10.3-22.924 22.957-22.924 22.173 0 42.226-8.947 56.702-23.343 14.479-14.513 23.445-34.532 23.445-56.666 0-22.132-8.965-42.151-23.445-56.664-14.476-14.396-34.529-23.348-56.702-23.348-12.657 0-22.957-10.279-22.957-22.919V228.739c0-18.024 7.21-34.533 18.778-46.809 0.487-0.547 0.97-1.03 1.454-1.577 12.542-12.454 29.806-20.257 48.524-20.257H885.67c18.714 0 35.919 7.863 48.398 20.321 12.479 12.457 20.354 29.691 20.354 48.321V415.73c0 12.64-10.236 22.919-22.897 22.919-22.168 0-42.222 8.952-56.761 23.348-14.479 14.513-23.44 34.532-23.44 56.664 0 22.134 8.961 42.153 23.44 56.666 14.539 14.396 34.593 23.343 56.761 23.343 12.661 0 22.897 10.283 22.897 22.924v170.299c0 18.63-7.752 35.924-20.29 48.445-12.42 12.334-29.565 20.197-48.462 20.197H320.667z m0 0" fill="" p-id="3355" /></svg>),
  message: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2297"><path d="M511.297 952.315c-108.677 0-207.995-39.681-284.723-105.073-16.961-12.127-32.168-26.498-43.857-43.242-68.773-77.562-110.873-179.339-110.873-291.136 0-242.71 196.743-439.453 439.453-439.453 242.71 0 439.453 196.743 439.453 439.453 0 242.708-196.743 439.451-439.453 439.451v0zM511.297 908.371v0 0 0 0zM511.297 117.354c-218.452 0-395.508 177.055-395.508 395.508 0 86.792 28.301 166.817 75.718 232.031 37.31 13.006 104.151 31.639 182.329 31.639 96.153 0 208.653-87.891 301.465-87.891 77.386 0 140.625 22.94 169.849 35.64 38.848-61.172 61.656-133.55 61.656-211.421 0.002-218.451-177.055-395.506-395.508-395.506v0zM774.969 644.699h-43.943l-21.974-87.891-21.973 87.891h-43.943l-43.947-219.727h43.947l24.388 122.080 19.555-78.135h43.947l19.512 78.135 24.432-122.080h43.947l-43.947 219.727zM423.406 644.699v-219.727h131.836v43.945h-87.891v43.945h87.891v43.945h-87.891v43.943h87.891v43.947h-131.836zM335.516 644.699l-87.891-146.515v146.515h-43.945v-219.727h43.945l87.891 146.469v-146.469h43.945v219.727h-43.945z" /></svg>),
  tabs: (<svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M310.304 372.352H124.128a31.04 31.04 0 0 0-31.04 31.04v186.176c0 17.12 13.888 31.04 31.04 31.04h186.176a31.04 31.04 0 0 0 31.04-31.04v-186.176a31.04 31.04 0 0 0-31.04-31.04z m-15.52 217.216H139.648c-17.12 0-15.52 1.6-15.52-15.52v-155.136c0-17.12-1.6-15.52 15.52-15.52h155.136c17.12 0 15.52-1.6 15.52 15.52v155.136c0 17.12 1.6 15.52-15.52 15.52z m124.128-46.528h480.96V512h-480.96v31.04z m0 124.128h480.96v-31.04h-480.96v31.04z m0 139.616h480.96v-31.04h-480.96v31.04z m0-403.392h480.96v-31.04h-480.96v31.04zM992.96 170.656h-15.52V46.528a31.04 31.04 0 0 0-31.04-31.04h-170.656a31.04 31.04 0 0 0-31.04 31.04v124.128h-139.648V46.528a31.04 31.04 0 0 0-31.04-31.04h-170.656a31.04 31.04 0 0 0-31.04 31.04v124.128H248.192V46.528a31.04 31.04 0 0 0-31.04-31.04H30.976a31.04 31.04 0 0 0-31.04 31.04V992.96c0 17.12 13.888 31.04 31.04 31.04h961.952a31.04 31.04 0 0 0 31.04-31.04V201.696a31.04 31.04 0 0 0-31.04-31.04z m0 791.296a31.04 31.04 0 0 1-31.04 31.04H62.048a31.04 31.04 0 0 1-31.04-31.04V77.6a31.04 31.04 0 0 1 31.04-31.04h124.128a31.04 31.04 0 0 1 31.04 31.04v124.128h744.736a31.04 31.04 0 0 1 31.04 31.04v729.216z" p-id="4993"/></svg>)
}

// 左侧折叠面板
const DATA = [
  {
    key: 'common',
    name: '常用模块',
    children: [
      {
        key: 'text',
        name: '文字',
        components: [{ id: 'text_1', name: 'text' }, { id: 'title_1', name: 'title' }],
        icon: 'text'
      },
      {
        key: 'singleImg',
        name: '单张图片',
        components: [{ id: 'image_1', name: 'image' }],
        icon: 'singleImg'
      },
      {
        key: 'multiImg',
        name: '多张图片',
        components: [{ id: 'mult_img_1', name: 'multipleImage' }],
        icon: 'multiImg'
      },
      {
        key: 'hotImg',
        name: '图片热区',
        components: [{ id: 'hot_img', name: 'thermalZone' }],
        icon: 'hotImg'
      },
      {
        key: 'swiper',
        name: '轮播',
        components: [{ id: 'swiper_1', name: 'swiper' }],
        icon: 'swiper'
      },
      {
        key: 'tabs',
        name: '标签页',
        components: [{ id: 'tabs_1', name: 'tabs' }],
        icon: 'tabs'
      }
    ]
  },
  {
    key: 'goods',
    name: '商品模块',
    children: [
      {
        key: 'goodCard',
        name: '商品卡片',
        components: [{ id: 'goods_card_1', name: 'goodsCard' }],
        icon: 'goodCard'
      },
      {
        key: 'slideGood',
        name: '侧滑商品',
        components: [{ id: 'slideGood_1', name: 'goodsSlider' }],
        icon: 'slideGood'
      },
      {
        key: 'pointShop',
        name: '积分商城',
        components: [{ id: 'text_1', name: 'text' }],
        icon: 'pointShop'
      },
    ]
  },
  {
    key: 'news',
    name: '资讯模块',
    children: [
      {
        key: 'noticeCard',
        name: '消息卡片',
        components: [{ id: 'noticeCard_1', name: 'noticeCard' }],
        icon: 'noticeCard'
      },
      {
        key: 'articleCard',
        name: '文章卡片',
        components: [{ id: 'articleCard_1', name: 'articleCard' }],
        icon: 'articleCard'
      },
      {
        key: 'messageList',
        name: '资讯列表',
        components: [{ id: 'messageList_1', name: 'messageList' }],
        icon: 'message'
      },
      {
        key: 'photoArticleLinkage',
        name: '图文联动',
        components: [{ id: 'photoArticleLinkage_1', name: 'photoArticleLinkage' }],
        icon: 'swiper'
      },
    ]
  },
  {
    key: 'coupon',
    name: '促销模块',
    children: [
      {
        key: 'seckill',
        name: '秒杀',
        components: [{ id: 'text_1', name: 'text' }],
        icon: 'seckill'
      },
      {
        key: 'coupon',
        name: '领劵',
        components: [
          { id: 'coupon_1', name: 'coupon', options: { name: '口令领劵', desc: '输入口令领取优惠券', type: 1 } },
          { id: 'coupon_2', name: 'coupon', options: { name: '手机号领劵', desc: '输入手机号领取优惠券', type: 2 } }
        ],
        icon: 'coupon'
      },
      {
        key: 'gift',
        name: '新人礼包',
        components: [{ id: 'text_1', name: 'text' }],
        icon: 'gift'
      },
    ]
  }
]

class SiderLeft extends PureComponent {
  static defaultProps = {
    active: false
  }

  constructor(props) {
    super(props)
    this.state = {
      components: [],
      current: ''
    }
  }

  componentDidMount() {
    window.ee.on('RESET_LAYOUT_STATUS', this.resetSiderStatus)
    window.ee.on('RESET_SIDER_STATUS', this.resetSiderStatus)
  }

  componentWillUnmount() {
    window.ee.off('RESET_LAYOUT_STATUS')
    window.ee.off('RESET_SIDER_STATUS')
  }

  resetSiderStatus = () => {
    this.setState({ current: '' })
  }

  // 添加组件到主控制区域
  addComponent = (data) => {
    const key = uniqueId(8,8)
    // 添加组件到列表
    const component = { key, ...data }
    window.ee.emit('ADD_COMPONENT_DATA', component)
  }

  toggleTemplate = (event) => {
    const { currentTarget } = event
    const pid = currentTarget.getAttribute('data-pid')
    const id = currentTarget.getAttribute('data-id')
    // TODO:
    // currentTarget为当前元素
    // 此处的pid为DATA一层数据,id为DATA子元素的children的key(即为组件的种类)
    const template = _find(DATA, ({ key }) => key === pid)
    if (template && template.key) {
      const { key, components } = _find(template.children, (item) => id === item.key )
      if (key && components.length) {
        this.setState({ components, current: id })
      } else {
        this.setState({ current: id })
      }
    } else {
      this.setState({ current: id })
    }
    window.ee.emit('OPEN_SIDER_PANEL')
  }


  renderTemplateItem = (template) => {
    const { config, component } = TemplateMaps[template.name]
    // 传入外部参数改变默认 config 比如: 同一个组件但是不同的体现方式
    const data = config(template.options)
    const { name, desc, content, style } = data
    return (
      <div key={template.id} className="item" onClick={() => { this.addComponent(data) }}>
        <div className="item-header">
          <div className="item-header-title">{name}</div>
          <div className="item-header-desc">{desc}</div>
        </div>
        <Tooltip title="点击添加到页面">
          <div className="item-content">
            {
              React.createElement(component, {
                componentStyle: style,
                data: content.data,
              })
            }
          </div>
        </Tooltip>
      </div>
    )
  }

  render() {
    console.log('sider-render')
    const { current, components } = this.state
    const designStyle = classnames('x-design-sider-templates', { active: !!current })
    return (
      <Fragment>
        <Sider className="x-design-sider">
          <div className="x-design-sider-scroll">

            <Collapse className="x-design-sider-scroll-collapse" bordered={false} defaultActiveKey={['common', 'goods', 'news', 'coupon']}>
              {
                //  TODO:渲染了左侧栏
                DATA.map(item => (
                  <Panel header={item.name} key={item.key}>
                    <div className="module-content">
                      {
                        item.children.map(({ key, name, icon }) => (
                          <div
                            key={key}
                            data-pid={item.key}
                            data-id={key}
                            className={classnames('module-content-item', {
                              active: current === key
                            })}
                            onClick={this.toggleTemplate}
                          >
                            <div className="module-content-item-title">{name}</div>
                            {ICONS[icon]}
                          </div>
                        ))
                      }
                    </div>
                  </Panel>
                ))
              }
            </Collapse>
          </div>
          <Sider width="375" className={designStyle}>
            <div className="x-design-sider-templates-content">
              {
                components.map(component => this.renderTemplateItem(component))
              }
            </div>
          </Sider>
        </Sider>
      </Fragment>
    )
  }
}


export default SiderLeft
