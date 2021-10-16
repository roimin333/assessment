'use strict';//宣言後の記述ミスをエラーとして表示してくれる機能を呼び出すための記述(厳格モード)
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
/*const tweetDivided = document.getElementById('teet-area');w
assessmentButton.onclick = function() {
  console.log('ボタンが押されました');
  // TODO 診断結果表示エリアの作成
  // TODO ツイートエリアの作成
};
/*この関数の書き方は、無名関数といわれる名前を持たない関数の記述法で、 
それを assessmentButton というオブジェクトの onclick という プロパティに設定することで
、ボタンがクリックされた時に動くようにできます。 */
//function という文字を消して、代わりに => と書いています。この機能のことをアロー関数と呼びます。

/*assessmentButton.onclick=()=>{
    console.log('ボタンが押されました');
    // TODO 診断結果表示エリアの作成
    // TODO ツイートエリアの作成
}*/
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length===0){
        //名前が空の時は処理を終了する
        return;
    }
    console.log(userName);
    // TODO 診断結果表示エリアの作成
    resultDivided.innerText = "";
    //連続して診断するボタンを押しても、見出しと診断結果が増えないようにする処理
    /*innerText プロパティを用いて、
    診断結果表示エリアの内側の文字列を空文字列に変更します。
    つまりこの処理は、診断結果表示エリアの子どもの要素を
    全削除する、という動作をします。 */
    const header = document.createElement('h3');//「要素を作成する」
    //後からタグの中身だけを変更したい場合など↑
    header.innerText = '診断結果';//内側のテキスト
    resultDivided.appendChild(header);//div 要素を親として、h3 の見出しを子要素として追加する

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // TODO ツイートエリアの作成
    tweetDivided.innerText="";
    /*<a href=
    "https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw" 
    class="twitter-hashtag-button" 
    data-text="診断結果の文章" data-show-count="false">
    Tweet #あなたのいいところ</a>
    <script 
    async src="https://platform.twitter.com/widgets.js" 
    charset="utf-8"></script> のデータを元ネタとして書く*/
    const anchor = document.createElement('a');//aタグ付ける
    const hrefValue=
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    /*class 属性については setAttribute() メソッドを用いず、
    anchor.className というプロパティに値を設定しています。
    href など他の属性と異なり、class 属性 と id 属性に関しては
    それぞれ専用のプロパティが用意されているからです。
    もちろん、anchor.setAttribute('class', 'twitter-hashtag-button'): のように setAttribute() メソッドを用いて書いても同じ動きになるので、class だけ別の書き方をしたくないという場合はこちらでも構いません。 */
    //widgets.js スクリプトを設定し実行するコードを追加
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
  };
const answers=[
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています'
];
/*1.名前を入力すると診断結果が出力される関数
2.入力が同じ名前なら、同じ診断結果を出力する処理
診断結果の文章のうち名前の部分を、入力された名前に置き換える処理 */
/**
/ * 名前の文字列を渡すと診断結果を返す関数
 /* @param {string} userName ユーザーの名前
 /* @return {string} 診断結果
 /* 
 function assessment(userName) {
    // TODO 診断処理を実装する
    return '';//「関数 assessment(userName) の引数が文字列で、戻り値も文字列」
//}

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
* @return {string} 診断結果
/
/*最初の行は、「関数の処理内容」を説明しています。
2 行目の @param は関数の「引数」を表します。
引数は英語で parameter（パラメータ）といいます。
2 行目の userName は「引数の名前」を表します。
3 行目の @return は関数の「戻り値」のことで、
戻り値のことを return value といいます。
2 行目と 3 行目の {string} は値の 型 が「文字列（string）型」
であることを意味しています。 */

//charCodeAt()は文字列の指定した位置にある文字のUTF-16文字コードを取得する
/*名前を文字コードに変換して、計算して変換して配列を取得する！！
１名前のすべての文字のコード番号の整数値を足す
２足した結果を、診断結果のパターンの数で割った余りを取得する
余りを診断結果の配列の添え字として、診断結果の文字列を取得する*/
function assessment(userName) {//引数がuserName。これはhtmlのinputのIDがuser-nameだから
    // 入力された名前の全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    //名前の文字すべての文字のコードを足し合わせています。
    for (let i = 0; i < userName.length; i++) {
        //終了条件の userName.length は入力された文字列の長さを取得していて、これまでの配列の長さではない
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
  
    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    /*名前から計算した文字のコード番号の合計値÷診断結果のパターンの数＝余りを求め、
     それを利用して配列から診断結果を取得*/
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
  
    // TODO {userName} をユーザーの名前に置き換える
    result = result.replaceAll('{userName}',userName);
    return result;
    /*この記述は、result の文章内の {userName} という文字列のパターンを全て選択し、
    それら全てを変数 userName の表す部分文字列に置き換えています。
    そうして新たにできた文字列を変数 result に再代入しているのです。
    なお、 result を宣言するときの修飾子を const から let に変えました。
     これは、先ほどまでは result は一度代入されたら再代入されない定数だったのに対して、
      今回は result.replace() という関数の戻り値を再代入しているからです。
    ではこれで、Chrome で動かしてみましょう。 */
}

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
      // TODO ボタンのonclick() 処理を呼び出す
      assessmentButton.onclick();
    }
  };

/*試しに以下のように失敗するテストを書いてみて、Chrome で実行してみましょう。
診断結果の中の、2 番目の「太郎」を「次郎」に置き換えています。 */
console.assert(
    assessment('太郎')===
    '太郎のいいところは決断力です。次郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
)*
console.assert(
    assessment('太郎')===assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません'
);

