function random_word(words) {
  return words[Math.floor(Math.random()*words.length)];
}

function transliterate(word) {
  var output = '';

  for (var i = 0; i < word.length; i++ ) {
    output = output + hiragana[word.charAt(i)];
  }
  return output;
}

function set_new_word() {
  word = random_word(words);
  document.getElementById('kana').innerHTML = word;
  return word;
}

function show_correct_message(result) {
  result.innerHTML = 'Correct!'
  result.className = 'correct'
}

function show_incorrect_message(result, kana, answer) {
  result.innerHTML = 'Wrong! <strong>' + kana + '</strong> means <strong>' + answer + '</strong>.';
  result.className = 'wrong'
}

window.onload = function(){

  var kana = set_new_word();
  var romaji = transliterate(kana);

  var input = document.getElementById('input');
  var result = document.getElementById('result');

  input.focus();

  input.onkeypress = function(e) {
    if (!e) {
      e = window.event; /* Hello, IE. */
    }

    if ((e.keyCode == 13) ) {
      if (input.value.toLowerCase() == romaji) {
        show_correct_message(result);
      } else {
        show_incorrect_message(result, kana, romaji);
      }
      kana = set_new_word();
      romaji = transliterate(kana);
      input.value = '';
      input.focus();
    }
  }
}


/* Dim the footer if there is no mouse movement */

dim = setTimeout(hide, 10000);

function hide() {
  document.getElementById('footer').setAttribute('class', 'hide');
}

document.onmousemove = function() {
  document.getElementById('footer').setAttribute('class','show');
  clearTimeout(dim);
  dim = setTimeout(hide, 5000);
};
