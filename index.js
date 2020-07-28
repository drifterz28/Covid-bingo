const CovidBingo = [
  "Not covering nose",
  "Mesh mask",
  "pulling down mask to talk",
  "No mask",
  "Funny Mask",
  "Merica Mask",
  "hole over mouth",
  "Mask Too small",
  "Hanging off face",
  "Mask Too large",
  "Bitching about mask",
  "civil liberties",
  "Bitch about governer",
  "MAGA Mask",
  "Place has anti mask",
  "Knitted mask",
  "Hello Kitty",
  "Not keeping social distance",
  "Not washing hands",
  "Anti Covid",
  "Mask on inanimate object",
  "Baby Mask",
  "Staff with out mask",
  "Remove Mask to cough or sneeze",
  "Mask sit down",
  "Googles",
  "Damn Karen",
  "Complain about talking with a mask on",
  "Sports team mask"
];
const defaultUserData = {
  array: CovidBingo,
  selected: []
}
let loadUserData = localStorage.user;
const activeUser = !!loadUserData;
let index = 0;
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

if(!activeUser) {
  shuffleArray(CovidBingo);
  console.log('new')
  userData = defaultUserData;
  localStorage.user = JSON.stringify(userData);
} else {
  console.log('old')
  userData = JSON.parse(loadUserData);
}

const columns = document.querySelectorAll('.board > div');

const addChecked = () => {
  [...columns].forEach(div => {
    const key = div.getAttribute('key');
    if(userData.selected.includes(key)) {
      div.classList.add('checked');
    }
  });
}

const updateSelected = () => {
  const selected = [];
  [...columns].forEach(div => {
    if(div.classList.contains('checked')) {
      const key = div.getAttribute('key');
      selected.push(key);
    }
  });
  userData.selected = selected;
  localStorage.user = JSON.stringify(userData);
}

[...columns].forEach(div => {
  if(!div.classList.contains('free-space')) {
    div.textContent = userData.array[index];
    div.setAttribute('key', index);
    index++;
  }
});

[...columns].forEach(input => {
  input.addEventListener('click', (e) => {
    const current = e.currentTarget;
    current.classList.toggle('checked');
    updateSelected();
  })
});

document.querySelector('button').addEventListener('click', () => {
  localStorage.clear();
})

addChecked()
