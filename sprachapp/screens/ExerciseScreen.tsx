import { View, Text, TouchableOpacity } from "react-native";
import { useExercise } from "@/hooks/useExercise";
import { useUser } from "@/hooks/useUser";
import { demoUser, User } from "@/data/user";
import { Link } from "expo-router" 


export default function ExerciseScreen() {
  //Loading DemoUSer from a variable, future: load from context
 const user = demoUser

  const {
    exercise,
    selectedAnswer,
    showFeedback,
    isCorrect,
    finished,
    selectAnswer,
    checkAnswer,
    next,
    result,
  } = useExercise(user);

  // 🟢 RESULT VIEW
  if (finished && result) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 22 }}>Ergebnis</Text>
        <Text>
          {result.correct} von {result.total} richtig
        </Text>
        <Text>
          Erfolgsquote:{" "}
          {Math.round((result.correct / result.total) * 100)}%
        </Text>

        <Link href={"/"}> Zurück zur Startseite</Link>
        <Link href={"/progress"}> Progress ansehen</Link>
      </View>
    );
  }

  // 🟡 EXERCISE VIEW
  return (
    <View style={{ padding: 16 }}>
      <Text>{exercise.question}</Text>
      <Text>{exercise.prompt}</Text>


      {exercise.answers.map((a) => (
        <TouchableOpacity
          key={a.id}
          onPress={() => selectAnswer(a.id)}
        >
          <Text>{a.text}</Text>
        </TouchableOpacity>
      ))}

      {showFeedback && (
        <Text>{isCorrect ? "✅ Richtig" : "❌ Falsch"}</Text>
      )}

      <TouchableOpacity
        disabled={!selectedAnswer}
        onPress={showFeedback ? next : checkAnswer}
      >
        <Text>
          {showFeedback ? "Weiter" : "Antwort prüfen"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}