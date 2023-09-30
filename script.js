$(function () {
  //カードのデータ形式
  const card = [
    { number: 1, src: "img/1_of_clubs.png" },
    { number: 1, src: "img/1_of_diamonds.png" },
    { number: 1, src: "img/1_of_hearts.png" },
    { number: 1, src: "img/1_of_spades.png" },
    { number: 2, src: "img/2_of_clubs.png" },
    { number: 2, src: "img/2_of_diamonds.png" },
    { number: 2, src: "img/2_of_hearts.png" },
    { number: 2, src: "img/2_of_spades.png" },
    { number: 3, src: "img/3_of_clubs.png" },
    { number: 3, src: "img/3_of_diamonds.png" },
    { number: 3, src: "img/3_of_hearts.png" },
    { number: 3, src: "img/3_of_spades.png" },
    { number: 4, src: "img/4_of_clubs.png" },
    { number: 4, src: "img/4_of_diamonds.png" },
    { number: 4, src: "img/4_of_hearts.png" },
    { number: 4, src: "img/4_of_spades.png" },
    { number: 5, src: "img/5_of_clubs.png" },
    { number: 5, src: "img/5_of_diamonds.png" },
    { number: 5, src: "img/5_of_hearts.png" },
    { number: 5, src: "img/5_of_spades.png" },
    { number: 6, src: "img/6_of_clubs.png" },
    { number: 6, src: "img/6_of_diamonds.png" },
    { number: 6, src: "img/6_of_hearts.png" },
    { number: 6, src: "img/6_of_spades.png" },
    { number: 7, src: "img/7_of_clubs.png" },
    { number: 7, src: "img/7_of_diamonds.png" },
    { number: 7, src: "img/7_of_hearts.png" },
    { number: 7, src: "img/7_of_spades.png" },
    { number: 8, src: "img/8_of_clubs.png" },
    { number: 8, src: "img/8_of_diamonds.png" },
    { number: 8, src: "img/8_of_hearts.png" },
    { number: 8, src: "img/8_of_spades.png" },
    { number: 9, src: "img/9_of_clubs.png" },
    { number: 9, src: "img/9_of_diamonds.png" },
    { number: 9, src: "img/9_of_hearts.png" },
    { number: 9, src: "img/9_of_spades.png" },
    { number: 10, src: "img/10_of_clubs.png" },
    { number: 10, src: "img/10_of_diamonds.png" },
    { number: 10, src: "img/10_of_hearts.png" },
    { number: 10, src: "img/10_of_spades.png" },
    { number: 11, src: "img/11_of_clubs.png" },
    { number: 11, src: "img/11_of_diamonds.png" },
    { number: 11, src: "img/11_of_hearts.png" },
    { number: 11, src: "img/11_of_spades.png" },
    { number: 12, src: "img/12_of_clubs.png" },
    { number: 12, src: "img/12_of_diamonds.png" },
    { number: 12, src: "img/12_of_hearts.png" },
    { number: 12, src: "img/12_of_spades.png" },
    { number: 13, src: "img/13_of_clubs.png" },
    { number: 13, src: "img/13_of_diamonds.png" },
    { number: 13, src: "img/13_of_hearts.png" },
    { number: 13, src: "img/13_of_spades.png" },
  ];

  // 選択されたカードの情報が入る配列
  let selected = [];

  //ランダム処理
  function shuffle(array) {
    /*
    ランダムに出たインデックスの要素をi番目の要素と入れ替える
    交換する要素がなくなったら終了となるため、最後のインデックスからループさせると
    後ろの要素から置き換わっていき、すべての要素が満遍なくシャッフルされる
    */
    for (i = array.length - 1; i > 0; i--) {
      let randomNum = Math.floor(Math.random() * (i + 1));
      let currentCard = array[i];
      array[i] = array[randomNum];
      array[randomNum] = currentCard;
    }
  }

  shuffle(card);

  html = "";

  //カードの配置
  for (let i = 0; i < card.length; i++) {
    let str_i = String(i);

    // 例: <img id="1" src="img/card_back.png" alt="[1]">
    html +=
      '<img src="img/card_back.png" class="cards" id="' +
      str_i +
      '" alt="' +
      "[" +
      str_i +
      "]" +
      '">';
  }
  $("#table").html(html);

  //カードがクリックされた時の処理
  let gameStart = false; // ゲームが開始しているか判別のためのフラグ
  let timer; // 複数関数内で使用できるようタイマーID用の変数をあらかじめ用意
  let timeNow = 0; // 秒数が入る変数
  $(".cards").on("click", function () {
    const clickedId = $(this).attr("id");
    $(".stop-btn").prop("disabled", false);
    if (!$(".stop-btn").hasClass("stoped")) {
      turn(clickedId);
    }
    // 初回クリック（false）だったらカウント開始
    if (gameStart == false) {
      $(".num").text(timeNow + "秒経過");
      playGameTime();
      gameStart = true;
    }
  });

  //カードをめくる
  function turn(id) {
    //2枚以上選択されていない時に限り、カードをめくって、選択中の配列に追加。
    if (selected.length < 2) {
      let selectedId = Number(id);
      $("#" + id).prop("src", card[selectedId].src);

      let data = {};
      data.id = id;
      data.card = card[selectedId];

      //既に選んだ事のあるものが選択された時、selectedに追加しない
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].card == card[selectedId]) {
          return false;
        }
      }

      selected.push(data);

      //2枚以上選択されている場合、判定処理へ
      if (selected.length >= 2) {
        console.log($("img:not('.hidden')").length);
        displayResult();
        setTimeout(judge, 1000);
      }
    }
  }

  //判定
  function judge() {
    //番号が一致している場合、1枚目と2枚目に選んだカードを消し、selectedを初期化してtrueを返す。
    if (selected[0].card.number == selected[1].card.number) {
      //TIPS:display:noneだと要素ごと消えてしまうので、消えたことがわかるようにvisibilityのほうが良い
      $("#" + selected[0].id).addClass("hidden");
      $("#" + selected[1].id).addClass("hidden");
      selected = [];
    } else {
      //一致していなければウラ面に戻して、selectedを初期化
      $("#" + selected[0].id).prop("src", "img/card_back.png");
      $("#" + selected[1].id).prop("src", "img/card_back.png");
      selected = [];
    }
    if ($("img:not('.hidden')").length == 0) {
      clear();
    }
  }

  // 当たり外れの出力
  let loseCount = 0;
  function displayResult() {
    const result = $(".result");
    if (selected[0].card.number == selected[1].card.number) {
      result.addClass("correct");
      result.removeClass("lose");
      result.text("あたり！");
    } else {
      result.addClass("lose");
      result.removeClass("correct");
      result.text("はずれ…");
      loseCount++;
    }
  }

  // カウント
  function playGameTime() {
    // 一時停止時に途中からスタートできるよう、0の時だけ1代入
    if (gameStart == false) {
      timeNow = 1;
    }
    timer = setInterval(function () {
      $(".num").text(timeNow++ + "秒経過");
    }, 1000);
  }
  function stopGameTime() {
    clearInterval(timer);
  }
  // クリア時
  function clear() {
    // 間違えた回数でメッセージ分岐
    let message = "";
    if (loseCount < 30) {
      message = "素晴らしい！";
    } else {
      message = "次は頑張りましょう！";
    }
    // クラスでメッセージ分岐
    $(".clear-message").addClass("show");
    $(".clear-message").html(
      "<p>クリアです。おめでとうございます！<br>クリアタイム" +
        timeNow +
        "秒</p><p>間違えた回数は" +
        loseCount +
        "回です<br>" +
        message +
        "</p><a href=''>もう一度やる！</a>"
    );
    stopGameTime(timer);
  }
  // 一時停止・再開
  $(".stop-btn").on("click", function () {
    $(this).toggleClass("stoped");
    $(".cards").toggleClass("disabled");
    stopGameTime();
    if ($(this).hasClass("stoped")) {
      stopGameTime();
      $(this).text("再開");
    } else {
      playGameTime();
      $(this).text("一時停止");
    }
  });

  $(".retire-btn").on("click", function () {
    if (window.confirm("諦めてよろしいですか？")) {
      $(".clear-message").addClass("show");
      $(".clear-message").html(
        "<p>またチャレンジしてくださいね！</p><a href=''>もう一度やる！</a>"
      );
      stopGameTime();
      // すべて表にして表示
      html = "";
      for (let i = 0; i < card.length; i++) {
        let str_i = String(i);
        html +=
          '<img src="' +
          card[i].src +
          '" class="cards" id="' +
          str_i +
          '" alt="' +
          "[" +
          str_i +
          "]" +
          '">';
      }
      $("#table").html(html);
    }
  });
});
