import { NavLink } from 'react-router-dom';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileNavigation } from './MobileNavigation';

type EndlessKnotProps = {
  className: string;
};

const EndlessKnot = ({ className }: EndlessKnotProps) => (
  <svg viewBox="0 0 50000 50000" className={className}>
    <path d="m38255.34 21197.05-3134.15 3136.37-582.77-579.55 2883.83-2885.88-1.04-.96c1075.1-1164.35 2438.74-1680.92 3799.74-1680.92 715.66 0 1431.48 144.52 2104.22 414.05 669.41 268.2 1294.59 660.36 1832.55 1157.07 1112.31 1027.05 1856.3 2499.13 1856.3 4246.53 0 1763.54-702.31 3239.92-1771.47 4269.74-521.51 502.32-1130.92 897.72-1789.13 1167.73-661.58 271.37-1370.02 416.36-2086.01 416.36-1295.08 0-2619.1-468.69-3742.31-1513.96l-6.82 6.78-6061.99-6071 582.78-579.55 5822.41 5831.07 4.54-4.36c1004.5 1042.88 2218.96 1506.76 3401.39 1506.76 612.15 0 1214.44-122.56 1773.7-351.97 562.63-230.79 1084.29-569.51 1531.55-1000.29 915.63-881.94 1517.11-2152.77 1517.11-3677.31 0-1500.01-636.89-2762.03-1589.06-3641.21-465.25-429.57-1004.76-768.27-1581.42-999.31-573.34-229.71-1185.06-352.87-1798.34-352.87-1050.36 0-2102.78 366.39-2967.89 1184.42l2.28 2.26zm-25872.91 8105.26c-1118.55 981.33-2443.84 1428.74-3741.3 1428.74-761.48 0-1515.46-155.98-2213.89-450.13-697.08-293.58-1336.2-725.04-1869.36-1276.58-955.95-988.89-1571.9-2360.19-1571.9-4010.88 0-1747.4 743.99-3219.48 1856.3-4246.53 537.96-496.71 1163.14-888.87 1832.55-1157.07 672.74-269.54 1388.56-414.05 2104.22-414.05 1215.98 0 2434.02 412.41 3446.54 1330.68l.17-.16 3.66 3.66c119.43 108.51 236.02 223.98 349.37 346.74l-1.37 1.26 5455.91 5455.91-582.77 582.77-5806.84-5806.84c-844.9-751.68-1855.73-1089.76-2864.67-1089.76-613.28 0-1225 123.15-1798.34 352.86-576.66 231.04-1116.17 569.74-1581.42 999.31-952.17 879.19-1589.06 2141.21-1589.06 3641.22 0 1422.21 525.13 2597.95 1340.08 3440.99 455.26 470.95 1000.81 839.28 1595.7 1089.82 593.51 249.97 1238.86 382.52 1895.12 382.52 1183.56 0 2395.95-437.19 3393.82-1401.8l2.71 2.82 2945.96-2947.26 582.77 579.55-3172.35 3173.76-11.61-11.55zm9053.29 8722.09c-402.94 433.21-727.82 939.97-952.19 1497.82-224.92 559.19-348.73 1171.85-348.73 1815.47 0 1343.62 544.59 2560.02 1425.05 3440.48 880.47 880.46 2096.87 1425.05 3440.49 1425.05s2560.02-544.59 3440.49-1425.05c880.46-880.46 1425.05-2096.86 1425.05-3440.48 0-648.36-89.83-1254.63-297.2-1807.32-204.86-546-527.32-1048.05-995.07-1496.83l6.77-7.04-3038.75-3038.76 582.77-582.77 3230.53 3230.53-9.84 9.84c452.32 484.37 776.03 1019.87 993.12 1598.47 245.56 654.47 351.92 1355.69 351.92 2093.88 0 1571.14-636.87 2993.59-1666.53 4023.25-1029.67 1029.67-2452.12 1666.54-4023.26 1666.54-1571.14 0-2993.59-636.87-4023.26-1666.54-1029.66-1029.66-1666.53-2452.11-1666.53-4023.25 0-747.98 145.52-1464.05 409.9-2121.36 273.99-681.21 675.89-1297.16 1175.92-1818.02l3.72 3.57 5855.6-5859.73 582.77 579.56-5900.63 5904.79-2.11-2.1zm-567.01-25451.73c-1001.98-1058.48-1558.16-2452.64-1558.16-3910.35 0-1571.14 636.87-2993.59 1666.53-4023.25 1029.67-1029.67 2452.12-1666.54 4023.26-1666.54 1571.14 0 2993.59 636.87 4023.26 1666.54 1029.66 1029.66 1666.53 2452.11 1666.53 4023.25 0 1404.35-388.56 2680.26-1365.79 3714.41l2.14 2.14-6084.88 6084.89-582.77-582.78 6050.88-6050.88c847.33-886.75 1156.17-1960.43 1156.17-3167.78 0-1343.62-544.59-2560.02-1425.05-3440.48-880.47-880.46-2096.87-1425.05-3440.49-1425.05s-2560.02 544.59-3440.49 1425.05c-880.46 880.46-1425.05 2096.86-1425.05 3440.48 0 1261.78 479.92 2458.98 1354 3369.49l-.99.95 2773.39 2777.37-582.77 579.55-2811.35-2815.38 1.63-1.63zm-3006.97 8883.8-3654.25-3723.24c-925.38-921.86-1092.59-1952.52-799.93-2784.69 119.15-338.78 314.75-642.65 567.06-891.8 250.34-247.19 557.64-441.04 902.29-561.91 885.62-310.58 2008.79-139.22 3017.3 856.69l6271.71 6311.26-582.77 579.56-6265.59-6305.11c-751.96-742.4-1554.27-882.44-2170.19-666.45-227.24 79.7-430.39 208.04-596.41 371.97-164.06 162-290.82 358.38-367.44 576.25-196.11 557.59-63.12 1268.83 606.75 1934.67l3657.47 3726.46-586 576.34zm8396.48 1277.83 3772.94 3772.79-582.77 582.78-3772.94-3772.8 582.77-582.77zm6105.44 6177.51 3428.61 3356.17-.79.79c886.27 870.3 1074.66 1847.7 829.49 2659.29-105.68 349.83-293.63 667.34-542.63 931.28-246.76 261.56-553.96 469.78-900.54 603.55-840.63 324.5-1905.7 214.25-2882.57-635.96l-6484.11-6486.25 582.77-579.56 6442.31 6444.44c715.38 622.6 1466.76 714.38 2045.38 491.02 230.09-88.81 434.05-227.05 597.88-400.71 161.59-171.3 283.76-377.93 352.68-606.08 163.51-541.31 18.33-1212.2-619.42-1837.42l-3.22-1.62-3428.62-3356.17 582.78-582.77zm-8776.64-1795.97-3973.79-3975.09 582.78-579.56 3973.78 3975.09-582.77 579.56zm2755.25-10221.39 3889.95 3895.72-582.77 579.56-3889.95-3895.72 582.77-579.56zm-2421.29 16472.66-3918.82-3918.84 582.77-582.77 3918.83 3918.84-582.78 582.77zm9396.24-7228.37-4060.31 4074.02-582.77-579.55 4060.31-4074.02 582.77 579.55zm-4723.73-8276.85 3672.73-3672.98.82.83c852.41-942.57 1875.68-1074.12 2740.29-759 364.3 132.77 697.9 346.45 975.55 612.62 277.7 266.23 501.14 586.55 645.01 932.48 331.02 795.91 253.11 1717.74-517.91 2446.22l.54.53-6638.43 6638.88-582.78-582.77 6638.44-6638.88 11.26-9.66c488.24-456.32 537.68-1037.05 329.02-1538.77-100.47-241.57-258.13-466.82-455.04-655.59-196.97-188.83-431.57-339.67-685.78-432.32-578.57-210.86-1272.79-111.27-1863.72 550.5l-14.5 17.71-3672.73 3672.97-582.77-582.77zm-1454.83 8533.17-3691.03 3691.27-582.77-582.77 3691.03-3691.27 582.77 582.77zm-5904.52 5904.92-3625.19 3625.43-17.7 16.1c-861.45 766.11-1869.97 868.21-2696.45 562.54-350.21-129.51-667.49-333.36-926.82-591.87-261.63-260.79-464.72-578.04-584.03-931.92-262.99-780.03-120.84-1722.08 698.16-2604.38l6650.91-6703.5 582.77 579.56-6631.62 6684.14c-583.11 628.27-694.52 1268.77-521.02 1783.39 77.35 229.45 211.08 437.18 384.39 609.94 175.61 175.05 391.48 313.47 630.6 401.9 560.88 207.43 1251.28 133.9 1852.92-393.55l3620.31-3620.55 582.77 582.77zm1562.01-8708.11 3906.53-3937.95 582.77 579.56-3906.53 3937.94-582.77-579.55zm-6073.72 229.01 4082.67-4084.56 582.77 579.55-4082.67 4084.56-582.77-579.55z" />
  </svg>
);

export const SiteHeader = () => (
  <div className="flex justify-between mb-8">
    <NavLink to="/" className="flex group space-x-2 leading-6">
      <EndlessKnot className="h-12 w-12 flex-none fill-current group-hover:rotate-180 transition-transform duration-300" />
      <div className="flex flex-col">
        <div className="font-extrabold">Nate Kohari</div>
        <div>Professional Bit-shifter</div>
      </div>
    </NavLink>
    <DesktopNavigation />
    <MobileNavigation />
  </div>
);
