import 'package:core/core.dart';
import 'package:test/test.dart';

void main() {
  group('FsrsCardState', () {
    test('initial() produces a fresh card due at the given time', () {
      // Arrange
      final now = DateTime.utc(2026, 6, 18);

      // Act
      final state = FsrsCardState.initial(now: now);

      // Assert
      expect(state.due, now);
      expect(state.state, FsrsState.newCard);
      expect(state.reps, 0);
      expect(state.lapses, 0);
      expect(state.stability, 0);
      expect(state.lastReview, isNull);
    });

    test('survives a JSON round-trip', () {
      // Arrange
      final state = FsrsCardState(
        due: DateTime.utc(2026, 7),
        stability: 12.5,
        difficulty: 5.2,
        elapsedDays: 3,
        scheduledDays: 10,
        reps: 4,
        lapses: 1,
        state: FsrsState.review,
        lastReview: DateTime.utc(2026, 6, 20),
      );

      // Act
      final restored = FsrsCardState.fromJson(state.toJson());

      // Assert
      expect(restored, equals(state));
    });

    test('serializes state enum to its numeric FSRS value', () {
      // Act
      final json = FsrsCardState(
        due: DateTime.utc(2026),
        state: FsrsState.relearning,
      ).toJson();

      // Assert
      expect(json['state'], 3);
    });
  });
}
