import React, { useState } from "react";
import "./App.css";

const BingoGame = () => {
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [lastNumber, setLastNumber] = useState(null);
  const [animationKey, setAnimationKey] = useState(0); // Chave para reiniciar a animação

  // Função para determinar a letra correspondente ao número
  const getBingoLetter = (number) => {
    if (number >= 1 && number <= 15) return "B";
    if (number >= 16 && number <= 30) return "I";
    if (number >= 31 && number <= 45) return "N";
    if (number >= 46 && number <= 60) return "G";
    if (number >= 61 && number <= 75) return "O";
    return "";
  };

  // Função para sortear um número
  const callNumber = () => {
    const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
    const availableNumbers = allNumbers.filter(
      (num) => !calledNumbers.includes(num)
    );

    if (availableNumbers.length === 0) {
      alert("Todos os números foram chamados!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];

    setCalledNumbers([...calledNumbers, newNumber]);
    setLastNumber(newNumber);
    setAnimationKey((prevKey) => prevKey + 1); // Atualiza a chave para reiniciar a animação
  };

  // Função para filtrar números por letra
  const filterNumbersByLetter = (letter) =>
    calledNumbers
      .filter((num) => getBingoLetter(num) === letter)
      .sort((a, b) => a - b);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h1>Bingo Game</h1>
      <button onClick={callNumber} style={{ margin: "10px", padding: "10px" }}>
        Sortear Número
      </button>
      <div style={{ position: "relative", height: "200px", marginTop: "20px" }}>
        {lastNumber && (
          <div
            key={animationKey} // Usar uma chave única para reiniciar a animação
            className="bingo-ball last-number"
          >
            {`${getBingoLetter(lastNumber)} ${lastNumber}`}
          </div>
        )}
      </div>
      <h3>Números Chamados:</h3>
      <div className="bingo-grid">
        {["B", "I", "N", "G", "O"].map((letter) => (
          <div key={letter} className="bingo-column">
            <h4>{letter}</h4>
            {filterNumbersByLetter(letter).map((num) => (
              <div key={num} className={`bingo-ball ${letter}`}>
                {num}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BingoGame;
