class htmlTemplates 
{
    startBoxHTML = 
        `
        <div class="start-box-title-container">
        <h1 class="game-title">Hangman</h1>
        </div>
        <div class="text-regular">
        <p>Hangman is a classic word game in which you must find the correct answer by guessing letters one at a time.</p>
        <p>Use the keyboard (virtual or physical) to guess a letter.</p>
        <p>Be warned, every time you guess a letter wrong you loose a life and the hangman begins to appear, piece by piece.</p>
        <p>Solve the puzzle before the hangman dies.</p>
        </div>
        <div class="start-box-btn-container">
        <button id="start-box-btn" class="text-regular" type="button">START GAME</button>
        </div>
        `;
    
    gallowsSvgHTML = 
    `
        <svg width="350" height="580" viewBox="0 0 353 581" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect class="gallows-main" x="176.337" y="34.6662" width="30" height="200" transform="rotate(45 176.337 34.6662)" fill="black" stroke="#FFFEFE" stroke-width="3" />
        <rect class="gallows-main" x="34.5" y="1.5" width="30" height="578" rx="3.5" fill="black" stroke="#FFFEFE" stroke-width="3" />
        <rect class="gallows-main" x="351.5" y="34.5" width="30" height="350" rx="3.5" transform="rotate(90 351.5 34.5)" fill="black" stroke="#FFFEFE" stroke-width="3"/>
        
        <!-- ROPE -->
        <g transform="translate(245,200) scale(0.050000,-0.050000)" fill="#000000" stroke="none">
        <path d="M480 2985 c0 -19 24 -102 53 -185 58 -164 83 -449 58 -651 -14 -111
        -14 -111 -73 -98 -105 23 -146 -47 -90 -155 21 -39 30 -153 34 -420 l5 -366
        -91 -180 c-293 -577 -116 -999 363 -870 305 82 342 316 122 770 -155 320 -175
        382 -133 428 38 42 48 630 11 653 -11 7 -16 27 -11 46 69 230 51 635 -40 908
        l-51 155 -79 0 c-61 0 -78 -8 -78 -35z m229 -2224 c170 -339 170 -467 0 -532
        -306 -117 -407 156 -212 576 99 215 81 218 212 -44z"/>
        </g>
        
        <!-- HEAD -->
        <g class="gallows-hangman" id="body-part-1" transform="translate(220, 220) scale(0.08,-0.08)" fill="#000000" stroke="none" opacity="0">
        <ellipse style="fill: rgb(255, 255, 255);" cx="600" cy="600" rx="500" ry="500"></ellipse>
        <path d="M476 1199 c-256 -135 -454 -542 -366 -753 228 -544 1040 -453 1067
        120 16 335 -163 520 -446 460 -131 -29 -110 -63 33 -52 219 15 317 -94 332
        -368 30 -537 -677 -653 -901 -148 -93 209 89 582 347 713 54 27 98 54 98 59 0
        23 -96 5 -164 -31z"/>
        <path d="M608 1090 c-148 -75 -261 -163 -239 -186 8 -8 56 11 108 41 51 31
        144 80 207 110 63 30 115 66 115 80 1 40 -45 29 -191 -45z"/>
        <path d="M460 651 c0 -59 55 -92 82 -49 28 44 11 87 -37 94 -37 6 -45 -3 -45
        -45z"/>
        <path d="M761 681 c-13 -9 -21 -37 -18 -63 10 -70 85 -66 93 4 7 56 -31 86
        -75 59z"/>
        <path d="M455 406 c-117 -30 -25 -63 170 -59 113 1 237 -5 275 -15 62 -15 67
        -14 40 13 -64 63 -342 99 -485 61z"/>
        </g>

        <!-- BODY -->
        <rect class="gallows-hangman" id="body-part-2" x="270" y="210" width="6" height="115" fill="black" opacity="0"/>

        <!-- LEFT ARM -->
        <g class="gallows-hangman" id="body-part-3" transform="translate(210,325) scale(0.06,-0.06)" fill="#000000" stroke="none" opacity="0">
        <path d="M920 1637 c0 -7 -15 -19 -34 -25 -62 -23 -180 -107 -241 -173 -68
        -73 -226 -307 -260 -383 -37 -84 -63 -247 -81 -506 l-18 -245 -37 -41 c-63
        -70 -63 -166 -1 -214 13 -11 35 -20 48 -20 31 0 81 44 93 83 5 18 15 151 21
        297 11 267 35 488 65 590 9 30 41 96 71 145 31 50 61 99 67 110 58 96 184 233
        252 272 60 34 116 55 163 60 49 6 52 7 52 34 l0 29 -80 0 c-59 0 -80 -3 -80
        -13z"/>
        </g>

        <!-- RIGHT ARM -->
        <g class="gallows-hangman" id="body-part-4" transform="translate(276,325) scale(0.06,-0.06)" fill="#000000" stroke="none" opacity="0">
        <path d="M0 1621 c0 -26 3 -29 48 -35 26 -4 67 -18 92 -31 25 -13 54 -28 65
        -33 43 -21 164 -152 226 -247 115 -176 131 -204 151 -268 32 -104 57 -319 68
        -598 6 -145 16 -278 21 -296 12 -39 62 -83 93 -83 13 0 35 9 48 20 62 48 62
        144 -1 214 l-37 41 -18 245 c-18 259 -44 422 -81 506 -34 76 -192 310 -260
        383 -61 66 -179 150 -241 173 -19 6 -34 18 -34 25 0 9 -19 13 -70 13 l-70 0 0
        -29z"/>
        </g>

        <!-- LEFT LEG -->
        <g class="gallows-hangman" id="body-part-5" transform="translate(244,430) scale(0.06,-0.06)" fill="#000000" stroke="none" opacity="0">
        <path d="M440 1878 c0 -7 -25 -80 -56 -163 -30 -82 -65 -175 -76 -205 -11 -30
        -26 -71 -33 -90 -7 -19 -27 -73 -43 -120 -17 -47 -47 -130 -67 -185 -36 -98
        -36 -101 -26 -175 14 -97 64 -534 78 -676 6 -68 9 -64 -65 -79 -39 -8 -92 -50
        -92 -73 1 -51 80 -92 175 -92 118 0 171 51 126 123 -15 24 -24 63 -31 133 -9
        91 -24 219 -50 444 -21 174 -31 306 -25 336 3 17 52 157 108 310 57 153 107
        291 111 307 3 15 13 27 21 27 12 0 15 18 15 95 l0 95 -35 0 c-21 0 -35 -5 -35
        -12z"/>
        </g>

        <!-- RIGTH LEG -->
        <g class="gallows-hangman" id="body-part-6" transform="translate(270,430) scale(0.06,-0.06)" fill="#000000" stroke="none" opacity="0">
        <path d="M0 1802 c0 -96 -3 -87 145 -487 43 -115 82 -225 87 -244 9 -32 1
        -167 -22 -356 -20 -166 -41 -343 -50 -439 -7 -70 -16 -109 -31 -133 -45 -72 8
        -123 126 -123 95 0 174 41 175 92 0 23 -53 65 -92 73 -74 15 -71 11 -65 79 14
        142 64 579 78 676 10 74 10 77 -26 175 -20 55 -50 138 -67 185 -16 47 -36 101
        -43 120 -7 19 -22 60 -33 90 -11 30 -46 123 -76 205 -31 83 -56 156 -56 163 0
        6 -11 12 -25 12 -25 0 -25 -1 -25 -88z"/>
        </g>
        </svg
    `;

    gallowsSvgHTML2 = 
    `
        <svg width="353" height="581" viewBox="0 0 353 581" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect class="gallows-main" x="176.337" y="34.6662" width="39" height="199.598" transform="rotate(45 176.337 34.6662)" fill="black" stroke="#FFFEFE" stroke-width="3" />
        <rect class="gallows-main" x="34.5" y="1.5" width="39" height="578" rx="3.5" fill="black" stroke="#FFFEFE" stroke-width="3" />
        <rect class="gallows-main" x="351.5" y="34.5" width="39" height="350" rx="3.5" transform="rotate(90 351.5 34.5)" fill="black" stroke="#FFFEFE" stroke-width="3"/>
        <rect class="gallows-rope" x="273" y="71" width="10" height="74" fill="#24150b"/> 

        <g transform="matrix(0.02627, 0, 0, -0.02627, 242, 230)" fill="#000000" stroke="none" id="object-0" style="">
        <path d="M1160 5179 c0 -735 2 -781 35 -772 19 6 105 22 190 36 l155 25 0 746
        0 746 -190 0 -190 0 0 -781z" style="fill: rgb(36, 21, 11); stroke: rgb(0, 0, 0); stroke-width: 40px;"></path>
        <path d="M478 5292 c-123 -35 -283 -124 -349 -193 l-54 -57 127 -139 128 -139
        50 45 c186 172 448 170 641 -4 l99 -89 0 250 0 249 -105 45 c-130 56 -399 72
        -537 32z" style="fill: rgb(36, 21, 11); stroke: rgb(0, 0, 0); stroke-width: 40px;"></path>
        <path d="M1310 4391 c-671 -121 -656 -117 -709 -185 -73 -92 -34 -239 75 -284
        60 -25 1279 173 1373 223 180 96 101 361 -105 353 -30 -1 -315 -50 -634 -107z" style="fill: rgb(36, 21, 11); stroke: rgb(0, 0, 0); stroke-width: 40px;"></path>
        <path d="M1260 3930 c-642 -117 -631 -114 -671 -191 -66 -128 16 -279 151
        -279 106 0 1225 199 1296 231 94 42 135 144 96 237 -59 142 -111 142 -872 2z" style="fill: rgb(36, 21, 11); stroke: rgb(0, 0, 0); stroke-width: 40px;"></path>
        <path d="M1300 3487 c-335 -59 -630 -122 -655 -139 -117 -76 -108 -250 15
        -315 l70 -38 650 115 c755 134 832 170 762 354 -61 160 -74 160 -842 23z" style="fill: rgb(36, 21, 11); stroke: rgb(0, 0, 0); stroke-width: 40px;"></path>
        <path d="M1600 3107 c-82 -16 -152 -33 -156 -36 -4 -4 170 -258 387 -564 560
        -793 617 -938 518 -1316 -262 -1007 -1691 -957 -1890 65 -59 305 0 500 292
        957 118 185 286 449 374 585 l158 248 -87 -14 c-47 -7 -162 -28 -256 -45
        l-170 -31 -263 -413 c-516 -811 -575 -1155 -295 -1722 614 -1243 2467 -850
        2542 539 22 413 -44 567 -563 1301 -380 538 -327 498 -591 446z" style="fill: rgb(36, 21, 11); stroke: rgb(0, 0, 0); stroke-width: 40px;"></path>
        </g>
      
        <circle class="gallows-hangman" id="body-part-1" cx="277.5" cy="195.5" r="48" stroke="#909090" stroke-width="5" opacity="0"/>
        <rect class="gallows-hangman" id="body-part-3" x="276" y="246" width="5" height="100" transform="rotate(-39.6353 276 246.19)" fill="#909090" opacity="0"/>
        <rect class="gallows-hangman" id="body-part-4" x="274" y="243" width="5" height="100" transform="rotate(39.64 274.796 243)" fill="#909090" opacity="0"/>
        <rect class="gallows-hangman" id="body-part-5" x="280" y="373" width="5" height="100" transform="rotate(-39.6353 276 377.19)" fill="#909090" opacity="0"/>
        <rect class="gallows-hangman" id="body-part-6" x="274" y="370" width="5" height="100" transform="rotate(39.64 274.796 374)" fill="#909090" opacity="0"/>
        <rect class="gallows-hangman" id="body-part-2" x="275" y="244" width="5" height="131" fill="#909090" opacity="0"/>
        </svg
    `;

}

export default htmlTemplates;