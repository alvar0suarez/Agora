import 'package:core/src/models/word.dart';

/// Read/write access to the vocabulary store.
abstract interface class WordRepository {
  /// Returns the word with [id], or null if none exists.
  Future<Word?> getById(String id);

  /// Returns the dictionary entry for [lemma], or null if not found.
  Future<Word?> findByLemma(String lemma);

  /// Full-text-ish search over lemmas and glosses.
  Future<List<Word>> search(String query);

  /// Words whose DCC rank falls within `[minRank, maxRank]` inclusive,
  /// ordered by rank ascending. Used by the Vocabulary Chronicle.
  Future<List<Word>> getByDccRankRange(int minRank, int maxRank);

  /// Inserts [word], or updates it if one with the same id already exists.
  Future<void> upsert(Word word);
}
