import 'package:core/core.dart';
import 'package:test/test.dart';

void main() {
  group('ReviewLog', () {
    ReviewLog build() => ReviewLog(
          id: 'l1',
          cardId: 'c1',
          rating: ReviewRating.good,
          reviewedAt: DateTime.utc(2026, 6, 18, 9, 30),
          scheduledDays: 4,
        );

    test('two instances with the same data are equal', () {
      expect(build(), equals(build()));
    });

    test('survives a JSON round-trip', () {
      final log = build();
      expect(ReviewLog.fromJson(log.toJson()), equals(log));
    });

    test('serializes rating to its numeric FSRS value', () {
      // ReviewRating.good == 3 per the FSRS convention.
      expect(build().toJson()['rating'], 3);
    });
  });
}
