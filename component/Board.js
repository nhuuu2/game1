import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Board = () => {
  const [board, setBoard] = useState(Array(10).fill(null).map(() => Array(10).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("V");
  const [message, setMessage] = useState("");

  const hasValidMoves = (board, player) => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (!board[row][col]) {
          if (player === "V" && row + 1 < board.length && !board[row + 1][col]) {
            return true;
          }
          if (player === "H" && col + 1 < board[row].length && !board[row][col + 1]) {
            return true;
          }
        }
      }
    }
    return false;
  };


  const handleClick = (row, col) => {
    const newBoard = board.map(rowArr => rowArr.slice()); // Deep copy
    if (currentPlayer === "V") {
      if (row + 1 < 10 && !newBoard[row][col] && !newBoard[row + 1][col]) {
        newBoard[row][col] = "V";
        newBoard[row + 1][col] = "V";
      } else {
        setMessage("Invalid move for Vertical player!");
        return;
      }
    } else if (currentPlayer === "H") {
      if (col + 1 < 10 && !newBoard[row][col] && !newBoard[row][col + 1]) {
        newBoard[row][col] = "H";
        newBoard[row][col + 1] = "H";
      } else {
        setMessage("Invalid move for Horizontal player!");
        return;
      }
    }

    setBoard(newBoard);
    setMessage("");

    setCurrentPlayer(prev => {
      const nextPlayer = prev === "V" ? "H" : "V";
      if (!hasValidMoves(newBoard, nextPlayer)) {
        setMessage(`${prev} win!`);
        return prev;
      }
      return nextPlayer;
    });
  };

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.title}>Domineering Game</Text>
      <Text style={styles.currentPlayer}>
        Current Player: {currentPlayer === "V" ? "Vertical (V)" : "Horizontal (H)"}
      </Text>

      <View style={styles.board}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <TouchableOpacity
              key={`${rowIndex}-${colIndex}`}
              style={[styles.cell, cell === "V" && styles.cellV, cell === "H" && styles.cellH]}
              onPress={() => handleClick(rowIndex, colIndex)}
            >
              <Text style={styles.cellText}>{cell || ""}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      {message ? <Text style={styles.error}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  currentPlayer: {
    fontSize: 18,
    marginBottom: 10,
  },
  board: {
    width: 400,
    height: 400,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 10,
  },
  cell: {
    width: 37,
    height: 37,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
  },
  cellText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cellV: {
    backgroundColor: "#3498db",
    color: "white",
  },
  cellH: {
    backgroundColor: "#e74c3c",
    color: "white",
  },
  error: {
    color: "#e74c3c",
    fontSize: 16,
    marginTop: 10,
  },
});

export default Board;
