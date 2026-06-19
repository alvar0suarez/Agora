import 'package:core/src/models/enums.dart';
import 'package:core/src/models/fsrs_card_state.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'review_card.freezed.dart';
part 'review_card.g.dart';

/// A spaced-repetition flashcard derived from a word.
///
/// [front] / [back] are the prompt and answer (their exact content depends on
/// [cardType]). [fsrsState] carries the scheduling data the SRS engine reads
/// and updates.
@freezed
abstract class ReviewCard with _$ReviewCard {
  const factory ReviewCard({
    required String id,

    /// Id of the word this card reviews.
    required String wordId,

    /// Prompt shown to the learner.
    required String front,

    /// Expected answer.
    required String back,

    required CardType cardType,

    required FsrsCardState fsrsState,

    required DateTime createdAt,
  }) = _ReviewCard;

  factory ReviewCard.fromJson(Map<String, dynamic> json) =>
      _$ReviewCardFromJson(json);
}
