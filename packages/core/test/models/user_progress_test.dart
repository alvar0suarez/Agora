import 'package:core/core.dart';
import 'package:test/test.dart';

void main() {
  group('UserProgress', () {
    test('initial() starts at zero XP and level 1', () {
      // Act
      final progress = UserProgress.initial();

      // Assert
      expect(progress.totalXp, 0);
      expect(progress.level, 1);
      expect(progress.streak, 0);
      expect(progress.wordsLearned, 0);
      expect(progress.lessonsCompleted, 0);
      expect(progress.lastActiveAt, isNull);
    });

    test('survives a JSON round-trip', () {
      // Arrange
      final progress = UserProgress(
        streak: 7,
        totalXp: 1500,
        level: 4,
        wordsLearned: 120,
        lessonsCompleted: 9,
        lastActiveAt: DateTime.utc(2026, 6, 18),
      );

      // Act
      final restored = UserProgress.fromJson(progress.toJson());

      // Assert
      expect(restored, equals(progress));
    });

    test('copyWith accumulates XP without touching other fields', () {
      // Arrange
      final progress = UserProgress.initial();

      // Act
      final updated = progress.copyWith(totalXp: progress.totalXp + 50);

      // Assert
      expect(updated.totalXp, 50);
      expect(updated.level, 1);
    });
  });
}
