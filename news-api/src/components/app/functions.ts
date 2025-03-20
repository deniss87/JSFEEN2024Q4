/*
    Scrool Up Button
*/ 
export function scrollUp(): void {

	if (window.innerWidth > 375) {
		const htmlDocument: HTMLElement = document.documentElement;
		const scrollUpBtn = document.querySelector<HTMLElement>(".scrollUpBtn");
		console.log(htmlDocument.scrollTop);
	
		if (scrollUpBtn) {
			scrollUpBtn.onclick = () => {
				window.scrollTo(0, 0)
			};
	
			window.addEventListener("scroll", (): void => {
					if (htmlDocument.scrollTop >= 300) {
						scrollUpBtn.style.display = "flex";
					}
					if (htmlDocument.scrollTop === 0) {
						scrollUpBtn.style.display = "none";
					}
				}
			);
		}  

	}
}

export function sourceSlider(): void {
	const sourcesContainer = document.querySelector<HTMLElement>(".sources");
	const sliderLeftBtn = document.querySelector<HTMLElement>(".source__btn_prev");
	const sliderRightBtn = document.querySelector<HTMLElement>(".source__btn_next");

	let sliderElementPos: number = 0;
	let finalRightPos: number;

	const sliderShift = function (): number[] {
		// Calculate the number of shifts based on the screen size
		if (sourcesContainer) {
			const scrollWidth: number = sourcesContainer.scrollWidth;
			const offsetWidth: number = sourcesContainer.offsetWidth;
			const shiftNum: number = Math.floor(scrollWidth / offsetWidth);
			const fullScrolls: number =  offsetWidth * shiftNum;
			const scrollDiff: number = scrollWidth - fullScrolls;
			
			finalRightPos = (scrollWidth - offsetWidth);
	
			let shiftValue: number = offsetWidth;

			if (sliderElementPos === -(fullScrolls - shiftValue)) {
				shiftValue = scrollDiff;
			}
			if ( sliderElementPos ===  -(scrollDiff)) {
				shiftValue = scrollDiff;
			}

			const shiftArr: number[] = [Math.round(shiftValue), shiftNum];

			return shiftArr;
		}
		return [0,0];
	}
	

	// Slider scroll (direction arg: -1 is right direction, +1 is left direction)
	const sliderScroll = function (direction: 1 | -1, value: number[]) {

		sliderElementPos += (direction * value[0]);

		// Disable slider buttons at the end and begining
		if (sliderRightBtn && sliderLeftBtn) {
			if ( Math.abs(sliderElementPos) ===  finalRightPos) {
				sliderRightBtn.setAttribute("disabled", "");
			} else {
					sliderRightBtn.removeAttribute("disabled");
			}
			if ( Math.abs(sliderElementPos) <= 0 ) {
					sliderLeftBtn.setAttribute("disabled", "");
			} else {
					sliderLeftBtn.removeAttribute("disabled");
			}
		}

		
		if (sourcesContainer) {
			sourcesContainer.style.transition = `transform ${value[0]}ms`;
			sourcesContainer.style.transform = `translateX(${sliderElementPos}px)`;
		}
		
	}

	// Slider Events
	if (sliderLeftBtn) {
		sliderLeftBtn.onclick = () => {
			sliderScroll(1, sliderShift());
		}
	}
	if (sliderRightBtn) {
		sliderRightBtn.onclick = () => {
			sliderScroll(-1, sliderShift());
		}
	}
	
	if (sourcesContainer) {
		window.addEventListener("resize", () => {
			if (sliderElementPos !== 0) {
					sourcesContainer.style.transform = `translateX(0px)`;
					if (sliderLeftBtn) {
						sliderLeftBtn.setAttribute("disabled", "");
					}
					if (sliderRightBtn) {
						sliderRightBtn.removeAttribute("disabled");
					}
					sliderElementPos = 0;
			}
		})
	}

}

