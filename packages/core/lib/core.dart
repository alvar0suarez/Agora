/// Agora's pure-Dart domain layer: models and repository interfaces.
///
/// Every other package depends on `core`; `core` depends on nothing
/// app-specific. Import this single barrel to access the public API.
library;

// Models
export 'src/models/enums.dart';
export 'src/models/fsrs_card_state.dart';
export 'src/models/lesson.dart';
export 'src/models/review_card.dart';
export 'src/models/review_log.dart';
export 'src/models/user_progress.dart';
export 'src/models/word.dart';

// Repository interfaces
export 'src/repositories/lesson_repository.dart';
export 'src/repositories/progress_repository.dart';
export 'src/repositories/review_repository.dart';
export 'src/repositories/word_repository.dart';
