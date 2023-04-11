async function rockPaperScissors(message) {
  try {
    const choices = ['Rock', 'Paper', 'Scissors'];

    // wysyłamy wiadomość do użytkownika o rozpoczęciu gry
    await message.reply('Rozpoczynamy grę w kamień-papier-nożyce! Wybierz jedną z trzech opcji: "rock", "paper" lub "scissors".');

    // tworzymy funkcję pomocniczą, która czeka na odpowiedź użytkownika
    const getUserChoice = async () => {
      const filter = (m) =>
        m.author.id === message.author.id &&
        typeof m.content === 'string' &&
        ['rock', 'paper', 'scissors'].includes(m.content.trim().toLowerCase()) ||
        false;

      const response = await message.channel.awaitMessages({
        filter,
        max: 1,
        time: 10000,
        errors: ['time'],
      });

      return response.first().content.trim().toLowerCase();
    };

    // pobieramy wybór użytkownika
    const userChoice = await getUserChoice();
    console.log(`Użytkownik wybrał: ${userChoice}`);

    // losujemy wybór komputera
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    console.log(`Komputer wybrał: ${computerChoice}`);

    // sprawdzamy wynik gry i wysyłamy wiadomość z wynikiem
    let result;
    if (userChoice === computerChoice) {
      result = "Remis!";
    } else if (
      (userChoice === "rock" && computerChoice === "Scissors") ||
      (userChoice === "paper" && computerChoice === "Rock") ||
      (userChoice === "scissors" && computerChoice === "Paper")
    ) {
      result = "Wygrałeś!";
    } else {
      result = "Przegrałeś!";
    }
    console.log(`Wynik: ${result}`);

    await message.reply(`Twój wybór: ${userChoice}. Wybór komputera: ${computerChoice}. ${result}`);
  } catch (error) {
    console.error(error);
    await message.reply("Wystąpił błąd podczas grania w kamień-papier-nożyce!");
  }
}

module.exports = { rockPaperScissors };