import 'package:freezed_annotation/freezed_annotation.dart';

/// Part of speech of a Greek word.
///
/// The `@JsonValue` strings are what get stored in the database and in the
/// seed JSON, so they must stay stable across versions.
enum PartOfSpeech {
  @JsonValue('noun')
  noun,
  @JsonValue('verb')
  verb,
  @JsonValue('adjective')
  adjective,
  @JsonValue('adverb')
  adverb,
  @JsonValue('pronoun')
  pronoun,
  @JsonValue('article')
  article,
  @JsonValue('preposition')
  preposition,
  @JsonValue('conjunction')
  conjunction,
  @JsonValue('particle')
  particle,
  @JsonValue('numeral')
  numeral,
  @JsonValue('interjection')
  interjection,
  @JsonValue('other')
  other,
}

/// Coarse difficulty band for a lesson, mirroring the onboarding choice
/// (principiante / intermedio / avanzado).
enum LessonDifficulty {
  @JsonValue('beginner')
  beginner,
  @JsonValue('intermediate')
  intermediate,
  @JsonValue('advanced')
  advanced,
}

/// What a review card asks the learner to recall.
enum CardType {
  /// Show the Greek form, recall the meaning (Greek → gloss).
  @JsonValue('recognition')
  recognition,

  /// Show the meaning, recall the Greek form (gloss → Greek).
  @JsonValue('production')
  production,

  /// Show the form, recall its morphological parse.
  @JsonValue('parsing')
  parsing,
}

/// The four FSRS ratings a learner gives after seeing a card.
///
/// Integer values follow the FSRS convention (1–4) so they map directly onto
/// the `fsrs` package and survive serialization unambiguously.
enum ReviewRating {
  @JsonValue(1)
  again,
  @JsonValue(2)
  hard,
  @JsonValue(3)
  good,
  @JsonValue(4)
  easy,
}

/// FSRS lifecycle state of a scheduled card. Values follow the FSRS spec.
enum FsrsState {
  @JsonValue(0)
  newCard,
  @JsonValue(1)
  learning,
  @JsonValue(2)
  review,
  @JsonValue(3)
  relearning,
}
