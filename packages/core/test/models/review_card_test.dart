import 'package:core/core.dart';
import 'package:test/test.dart';

void main() {
  group('ReviewCard', () {
    final now = DateTime.utc(2026, 6, 18);

    ReviewCard build() => ReviewCard(
          id: 'c1',
          wordId: 'w1',
          front: 'λόγος',
          back: 'word, speech, reason',
          cardType: CardType.recognition,
          fsrsState: FsrsCardState.initial(now: now),
          createdAt: now,
        );

    test('two instances with the same data are equal', () {
      expect(build(), equals(build()));
    });

    test('survives a JSON round-trip including nested fsrsState', () {
      final card = build();
      expect(ReviewCard.fromJson(card.toJson()), equals(card));
    });

    test('serializes cardType to its stable string value', () {
      expect(build().toJson()['cardType'], 'recognition');
    });
  });
}
