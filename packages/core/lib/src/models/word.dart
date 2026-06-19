import 'package:core/src/models/enums.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'word.freezed.dart';
part 'word.g.dart';

/// A Greek vocabulary entry.
///
/// [lemma] is the dictionary headword (e.g. `λόγος`). [form] is an optional
/// concrete inflected form as encountered in a text; for a plain dictionary
/// entry it is null and the lemma stands on its own.
@freezed
abstract class Word with _$Word {
  const factory Word({
    required String id,

    /// Dictionary headword in polytonic Greek.
    required String lemma,

    /// Short meaning / gloss in the learner's language.
    required String gloss,

    /// Part of speech.
    required PartOfSpeech pos,

    /// When this entry was added to the user's data.
    required DateTime createdAt,

    /// Concrete inflected form, if this entry refers to a specific occurrence.
    String? form,

    /// Raw corpus frequency count, if known.
    int? frequency,

    /// Rank within the Dickinson College Commentaries core vocabulary list.
    /// Lower = more frequent. Null if the word is outside the DCC core.
    int? dccRank,
  }) = _Word;

  factory Word.fromJson(Map<String, dynamic> json) => _$WordFromJson(json);
}
