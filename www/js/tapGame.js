//
//  tapGame.js
//  MonacaFirstApp
//
//  Created by Natsumo Ikeda on 2016/07/01.
//  Copyright 2017 FUJITSU CLOUD TECHNOLOGIES LIMITED All Rights Reserved.
//

/******************************************************/
// APIキーの設定

/******************************************************/

// mBaaSの初期化
var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
// タイマー設定
var countTimer = 13;
var countTimer1 = 23;
var countTimer2 = 33;

// タップ回数カウンター
var counter = 0;
// 「tapFlag」的のタップ可否設定
var tapFlag = false;

// 「Start」ボタン押下時の処理
function startGame() {
    // ボタンの無効化
    document.gameForm.start.disabled = true;
    document.gameForm.ranking.disabled = true;

    // タップカウンターリセット
    this.counter = 0;
    $("#list-page strong").html(String(0));
    // タイマーリセット
    this.countTimer = 13;
    // タイマーを起動
    countTime(countTimer);
}
function startGame1() {
    // ボタンの無効化
    document.gameForm.start.disabled = true;
    document.gameForm.ranking.disabled = true;

    // タップカウンターリセット
    this.counter = 0;
    $("#list-page strong").html(String(0));
    // タイマーリセット
    this.countTimer1 = 23;
    // タイマーを起動
    countTime1(countTimer1);
}
function startGame2() {
    // ボタンの無効化
    document.gameForm.start.disabled = true;
    document.gameForm.ranking.disabled = true;

    // タップカウンターリセット
    this.counter = 0;
    $("#list-page strong").html(String(0));
    // タイマーリセット
    this.countTimer2 = 33;
    // タイマーを起動
    countTime2(countTimer2);
}

// 【mBaaS】データの保存
function saveScore(name, score) {
    // **********【問題１】名前とスコアを保存しよう！**********
    var GameScore = ncmb.DataStore("GameScore");
    // クラスインスタンスを生成
    var gameScore = new GameScore();
    // 値を設定
    gameScore.set("name", name);
    gameScore.set("score", score);
    // 保存を実施
    gameScore.save()
        .then(function () {
            // 保存に成功した場合の処理
            console.log("保存に成功しました。");
        })
        .catch(function (error) {
            // 保存に失敗した場合の処理
            console.log("保存に失敗しました。エラー:" + error);
        });









    // ********************************************************
}

// タイマー
function countTime(time) {
    if (time > 0) {
        if (time >= 11) {
            this.tapFlag = false;
            $("#list-page p").html(String(time - 10));
        } else if (time == 10) {
            this.tapFlag = true;
            $("#list-page p").html("スタート！");
        } else {
            this.tapFlag = true;
            $("#list-page p").html(String(time));
        }
        this.countTimer -= 1;
        // １秒後にcountTime()を呼び出す
        setTimeout("countTime(countTimer)", 1000);
    } else {
        this.tapFlag = false;
        $("#list-page p").html("タイムアップ！");
        imputName(this.counter);
    }
}
function countTime1(time) {
    if (time > 0) {
        if (time >= 21) {
            this.tapFlag = false;
            $("#list-page p").html(String(time - 20));
        } else if (time == 20) {
            this.tapFlag = true;
            $("#list-page p").html("スタート！");
        } else {
            this.tapFlag = true;
            $("#list-page p").html(String(time));
        }
        this.countTimer1 -= 1;
        // １秒後にcountTime()を呼び出す
        setTimeout("countTime1(countTimer1)", 1000);
    } else {
        this.tapFlag = false;
        $("#list-page p").html("タイムアップ！");
        imputName(this.counter);
    }
}
function countTime2(time) {
    if (time > 0) {
        if (time >= 31) {
            this.tapFlag = false;
            $("#list-page p").html(String(time - 30));
        } else if (time == 30) {
            this.tapFlag = true;
            $("#list-page p").html("スタート！");
        } else {
            this.tapFlag = true;
            $("#list-page p").html(String(time));
        }
        this.countTimer2 -= 1;
        // １秒後にcountTime()を呼び出す
        setTimeout("countTime2(countTimer2)", 1000);
    } else {
        this.tapFlag = false;
        $("#list-page p").html("タイムアップ！");
        imputName(this.counter);
    }
}

// 名前入力アラートの表示
function imputName(count) {
    // 入力アラートを表示
    var name = window.prompt("名前を入力してください", "");
    if (name == null || name == "") {
        $("#list-page p").html("保存がキャンセルされました");
    } else {
        // スコアと入力した名前を保存
        saveScore(name, count);
        $("#list-page p").html(name + "さんのスコアは" + String(count) + "連打でした");
    }
    // ボタンの有効化
    document.gameForm.start.disabled = false;
    document.gameForm.ranking.disabled = false;
}

// タップ数カウント
function tapCount() {
    if (tapFlag) {
        this.counter += 1;
        $("#list-page strong").html(String(this.counter));
    }
}
