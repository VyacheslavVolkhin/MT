

//js tabs
const tabsNav = document.querySelectorAll('.js-tabs-nav')
const tabsBlocks = document.querySelectorAll('.js-tab-block')
function tabsActiveStart() {
	for (iTab = 0;iTab < tabsBlocks.length;iTab++) {
		if (tabsBlocks[iTab].classList.contains('active')) {
			tabsBlocks[iTab].classList.remove('active')
		}
	}
	for (i = 0;i < tabsNav.length;i++) {
		let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
		for (iElements = 0;iElements < tabsNavElements.length;iElements++) {
			if (tabsNavElements[iElements].classList.contains('active')) {
				let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
				for (j = 0;j < tabsBlocks.length;j++) {
					if (tabsBlocks[j].dataset.tab === tabsNavElementActive) {
						tabsBlocks[j].classList.add('active')
					}
				}
			}
		}
	}
}
for (i = 0;i < tabsNav.length;i++) {
	tabsNav[i].addEventListener('click', function(e) {
		if (e.target.dataset.tab) {
			let tabsNavElements = this.querySelector('[data-tab].active')
			tabsNavElements.classList.remove('active')
			e.target.classList.add('active')
			tabsActiveStart()
			e.preventDefault()
			e.stopPropagation()
			return false
		}
	})
}
tabsActiveStart()



//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}
function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}
function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let wrapWidth = document.querySelector('.wrap').offsetWidth
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if ( pMax > wrapWidth ) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}
for (i = 0;i < togglePopupButtons.length;i++) {
	togglePopupButtons[i].addEventListener('click', function(e) {
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0;i < closePopupButtons.length;i++) {
	closePopupButtons[i].addEventListener('click', function(e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function(event) {
	if (!event.target.classList.contains('js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.innerHTML = ''
			popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0;i < popupElementSelectItem.length;i++) {
			popupElementSelectItem[i].addEventListener('click', function(e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				e.preventDefault()
				e.stopPropagation()
				return false
			})
		}
	}
})
//input range
const rangeInputs = document.querySelectorAll('input[type="range"]')
for (i = 0; i < rangeInputs.length; i++) {
	let target = rangeInputs[i]
	const min = target.min
	const max = target.max
	const val = target.value
	let percentage = (val - min) * 100 / (max - min)
	target.style.backgroundSize = percentage + '% 100%'
	rangeResult = rangeInputs[i].value
	rangeInputs[i].parentNode.querySelector('.field-range-result').textContent = rangeResult
	rangeInputs[i].addEventListener('change', function (e) {
		rangeResult = this.value
		this.parentNode.querySelector('.field-range-result').textContent = rangeResult
	})
}

function handleInputChange(e) {
	let target = e.target
	const min = target.min
	const max = target.max
	const val = target.value
	let percentage = (val - min) * 100 / (max - min)
	target.style.backgroundSize = percentage + '% 100%'
	for (i = 0; i < rangeInputs.length; i++) {
		rangeResult = rangeInputs[i].value
		rangeInputs[i].parentNode.querySelector('.field-range-result').textContent = rangeResult
		rangeInputs[i].addEventListener('change', function (e) {
			rangeResult = this.value
			this.parentNode.querySelector('.field-range-result').textContent = rangeResult
		})
	}
}

rangeInputs.forEach(input => {
	input.addEventListener('input', handleInputChange)
})



//btn tgl
let tglButtons = document.querySelectorAll('.js-btn-tgl')
for (i = 0;i < tglButtons.length;i++) {
	tglButtons[i].addEventListener('click', function(e) {
		this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}


$(window).on('load', function () {


	//gallery slider
	if (!!$('.photos-slider-box').offset()) {
		let pSlider = $('.photos-slider-box .slider-wrap .slider').slick({
			dots: false,
			slidesToShow: 1,
			infinite: false,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
		});
		let pSliderPreview = $('.photos-slider-box .slider-preview-wrap .slider').slick({
			dots: false,
			slidesToShow: 4,
			vertical: false,
			infinite: false,
			prevArrow: false,
			nextArrow: false,
		});
		//pSlider.slick('refresh');
		//pSliderPreview.slick('refresh');
		$('.photos-slider-box .slider-wrap .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
			$('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$('.photos-slider-box .slider-preview-wrap .elm-photo[data-slide="' + currentSlide + '"]').parent().addClass('active');
		});
		$('.photos-slider-box .slider-preview-wrap .slider .elm-photo').click(function () {
			let newSlide = $(this).attr('data-slide');
			$('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$(this).parent().addClass('active');
			$('.photos-slider-box .slider-wrap .slider').slick('slickGoTo', newSlide);
			return false;
		})
		$('.js-popup-open').on('click', function () {
			if ($(this).attr('data-popup') == 'popup-card') {
				pSlider.slick('refresh');
				pSliderPreview.slick('refresh');
			}
		})
	}
});