import 'package:core/core.dart';
import 'package:test/test.dart';

void main() {
  group('Lesson', () {
    Lesson build() => const Lesson(
          id: 'u1',
          unit: 1,
          title: 'El alfabeto',
          grammarTopic: 'Alfabeto y pronunciación',
          difficulty: LessonDifficulty.beginner,
          content: '# El alfabeto griego\n...',
          vocabularyWordIds: ['w1', 'w2'],
          exerciseIds: ['e1'],
        );

    test('two instances with the same data are equal', () {
      expect(build(), equals(build()));
    });

    test('survives a JSON round-trip', () {
      final lesson = build();
      expect(Lesson.fromJson(lesson.toJson()), equals(lesson));
    });

    test('defaults list fields to empty when absent', () {
      // Act
      final lesson = Lesson.fromJson(<String, dynamic>{
        'id': 'u2',
        'unit': 2,
        'title': 'First declension',
        'grammarTopic': 'Sustantivos 1ª declinación',
        'difficulty': 'beginner',
        'content': '...',
      });

      // Assert
      expect(lesson.vocabularyWordIds, isEmpty);
      expect(lesson.exerciseIds, isEmpty);
    });
  });
}
