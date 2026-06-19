import 'package:core/core.dart';
import 'package:test/test.dart';

void main() {
  group('Word', () {
    final createdAt = DateTime.utc(2026, 6, 18, 12);

    Word build() => Word(
          id: 'w1',
          lemma: 'λόγος',
          gloss: 'word, speech, reason',
          pos: PartOfSpeech.noun,
          createdAt: createdAt,
          frequency: 1234,
          dccRank: 42,
        );

    test('two instances with the same data are equal', () {
      // Arrange / Act
      final a = build();
      final b = build();

      // Assert
      expect(a, equals(b));
      expect(a.hashCode, equals(b.hashCode));
    });

    test('copyWith changes only the targeted field', () {
      // Arrange
      final word = build();

      // Act
      final updated = word.copyWith(gloss: 'account');

      // Assert
      expect(updated.gloss, 'account');
      expect(updated.lemma, word.lemma);
    });

    test('survives a JSON round-trip', () {
      // Arrange
      final word = build();

      // Act
      final restored = Word.fromJson(word.toJson());

      // Assert
      expect(restored, equals(word));
    });

    test('serializes part of speech to its stable string value', () {
      // Act
      final json = build().toJson();

      // Assert
      expect(json['pos'], 'noun');
    });

    test('leaves optional fields null when absent', () {
      // Act
      final word = Word.fromJson(<String, dynamic>{
        'id': 'w2',
        'lemma': 'καί',
        'gloss': 'and',
        'pos': 'conjunction',
        'createdAt': createdAt.toIso8601String(),
      });

      // Assert
      expect(word.form, isNull);
      expect(word.frequency, isNull);
      expect(word.dccRank, isNull);
    });
  });
}
