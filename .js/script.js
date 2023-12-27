$(function () {
  // 기본동작 테스트
  // gsap.from('대상',{동작옵션})
  // 1. css 속성/값 적용
  // gsap.from('.logo', { transform: 'trslateY(-100px)', opacity: 0 });
  // 2. gsap 속성/값 적용 & delay 조정으로 애니메이션 적용
  // gsap.from('.logo', { y: -100, autoAlpha: 0, duration: 0.5 });
  // gsap.from('nav', { y: -100, autoAlpha: 0, duration: 1, delay: 0.5 });
  // gsap.from('.menu', { y: -100, autoAlpha: 0, delay: 1.5 });

  // 3. 여러 요소를 내 마음대로 제어하고 싶으면 타임라인을 만들자
  const TL = gsap.timeline();

  TL.from('nav > a', { y: -100, autoAlpha: 0, duration: 1, stagger: 0.1 });
  TL.from('.menu', { y: -100, autoAlpha: 0 });
  TL.from('.logo', {
    y: -100,
    autoAlpha: 0,
    duration: 0.5,
    ease: 'power4.out',
  });

  TL.from('.foot-box', { width: 0, autoAlpha: 0 });
  TL.to('.logo', { rotation: 360, ease: 'none' /* , repeat: -1, duration: 2  */ });
  TL.from('.sns-link li', { autoAlpha: 0, x: -50, stagger: 0.2 });
  TL.from('.copyright', { autoAlpha: 0 }, '-=0.3');

  TL.from('.bruce-lee-bg', { autoAlpha: 0, sclae: 0.9, duration: 5, ease: 'none' }, 0);
  TL.from('.bruce-lee', { autoAlpha: 0, scale: 1.2, ease: 'power4.inOut' });
  TL.from('.title h2 strong', { x: -50, autoAlpha: 0, duration: 1 });
  TL.from(
    '.title h2 span',
    {
      x: -50,
      autoAlpha: 0,
      duration: 1,
      onComplete: () => Splitting(),
    },
    '-=0.8'
  );
  TL.from('.small-bruce-lee', {
    xPercent: 200,
    duration: 0.7,
    ease: 'elastic.out(1,0.3)',
    onComplete: () => {
      $('.small-bruce-lee').addClass('action');
      initMoving();
    },
  });

  // 작은 이소룡을 클릭하면 소리지르게
  const screamSound = $('.scream').get(0);
  console.log(screamSound);

  $('small-bruce-lee').on('click', () => screamSound.play());

  // 부드러운 움직임 구현
  const $window = $(window);
  // 마우스 좌표값
  let x = 0;
  let y = 0;

  // 보정되는 마우스 좌표값
  let mx = 0;
  let my = 0;
  let speed = 0.008;

  // 반복되는 동작(moving)을 변수에 저장(취소시키려고)
  let movingObj;

  // 함수를 3개 만들기
  // 1. 마우스 좌표값 받아오는 함수
  function getOffset() {
    $window.on('mousemove', function (e) {
      //마우스 좌표의 시작지점을 화면의 정중앙으로 이동
      x = e.pageX - $window.outerWidth() / 2;
      y = e.pageY - $window.outerHeight() / 2;
    });
  }
  // 2. 오브젝트를 움직이게 하는 함수
  //마우스의 기본 좌표값을 기준으로 어떤 값을 만들어 내자
  function moving() {
    mx += (x - mx) * speed;
    my += (y - my) * speed;

    // 오브젝트에 좌표값 적용
    $('.bruce-lee').css({
      transform: `translate(${mx}px, 0px)`,
    });
    $('.bruce-lee-bg').css({
      transform: `translate(-${mx}px, 0px)`,
    });
    $('.title').css({
      transform: `translate(-${mx * 0.7}px, -50%)`,
    });

    // 부드럽게 반복
    movingObj = requestAnimationFrame(moving);
  }
  // 3. 1번과 2번을 실행시키는 함수
  // function initMoving() {} // 이름있는 함수
  const initMoving = function () {
    getOffset();
    moving();
  };
});
