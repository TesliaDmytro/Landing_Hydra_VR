'use strict';

document.addEventListener('DOMContentLoaded', function(){


	// -----------Animations
	document.body.style.overflowX = "hidden"; //скрито прокрут по Х (доопрацювати!!!)
	window.scrollTo(0,0); //написати ф-цію без зміщення у TOP !!!

	const animatedItems = document.querySelectorAll('.animatedItem'); //клас обєкта анімації

	if (animatedItems.length > 0) {
		window.addEventListener('scroll', ScrollAnim);
		function ScrollAnim(param){
			for (let i=0; i<animatedItems.length; i++){
				const animItem = animatedItems[i];
				const animItemHeight = animItem.offsetHeight;
				const animItemPos = offset(animItem).top;
				const animStart = 4;		//змінна для розрахунку точки спрацювання -1/4 висоти блока 

				let animItemPoint = window.innerHeight - animItemHeight / animStart;

				if (animItemHeight > window.innerHeight){
					let animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if ((pageYOffset > animItemPos - animItemPoint) && (pageYOffset < animItemPos + animItemHeight)){
					animItem.classList.add('_active');
				} else {
					if (!animItem.classList.contains('animNoHide')){   //класс для нескриття (без повторної анім.)
						animItem.classList.remove('_active'); 
					}  
				}
			}
		}

		function offset(el) {							//ф-ція отримання позиції
			const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
		}


		setTimeout(() => {			//затримка ф-ції на 1 екрані	
			ScrollAnim();			
		}, 300);	
	} 
	// -----------Animations

	// -------------Form validation

	const form = document.forms.joinForm;

	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		const formElemReq = document.querySelectorAll('._req');
		let formCompleted = 0;
		for (let i = 0; i<formElemReq.length; i++) {
			const input = formElemReq[i];
			if (input.value.length !== 0 && 
				!input.classList.contains('_error')) {
					formCompleted++;
			} //form completed condition
		}

	
		let formData = new FormData(form);   
										    //sending func
		if (formCompleted === 3) {       
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok){
				let result = await response.json();
				alert(result.message);
				form.reset();
			} else {
				alert('Error sending message');
			}

		} else {
			alert('Check Required fields')
		};
	} 

		const removeAlert = function (event) {
			if (this.nextElementSibling) {
				this.nextElementSibling.remove();
				this.classList.remove('_error', '_wellDone');
			}   //remove alerts 
		};

		// firstName
		const firstName = form.firstName;

		firstName.addEventListener('blur', function(event){
			if (this.value.length < 2) {					
				this.parentElement.insertAdjacentHTML(
					"beforeend",
					`<div class="inputError">
						At least 2 symbols.
					</div>`
				);
				this.classList.add('_error');
				this.classList.remove('_wellDone')
			} else {this.classList.add('_wellDone')}
		})

		firstName.addEventListener("focus", removeAlert);

		// email
		const email = form.email;

		email.addEventListener("blur", function (event) {
			if (emailTest(this)) {
				this.parentElement.insertAdjacentHTML(
					"beforeend",
					`<div class="inputError">
						Invalid eMail address
					</div>`
				);
				this.classList.add('_error');
				this.classList.remove('_wellDone')
			} else {this.classList.add('_wellDone')}
			
		});

		email.addEventListener("focus", removeAlert);	//прибираєм попередження при фокусі 

			//test email func
		function emailTest(input) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
		}

		// Phone
		const phoneNumber = form.phoneNumber;

		phoneNumber.addEventListener('blur', function(event){

			if (!numTest(this))  {					
				this.parentElement.insertAdjacentHTML(
					"beforeend",
					`<div class="inputError">
						Uncorrect Phone Number
					</div>`
				);
				this.classList.add('_error');
				this.classList.remove('_wellDone')
			}	else {this.classList.add('_wellDone')}		
		})

		phoneNumber.addEventListener("focus", removeAlert); 

		function numTest(input) {
				return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
		}//symbols only func

		const formElemNotReq = document.querySelectorAll('.notReq');

		for (let i = 0; i<formElemNotReq.length; i++) {
			const input = formElemNotReq[i];
			input.addEventListener('blur', function(event){
				if (input.value.length>1){
					input.classList.add('_wellDone');
				} else {
					input.classList.remove('_wellDone')
				}
			})		//green for unrequired fullfilled
		}

	// -------------Form validation

})