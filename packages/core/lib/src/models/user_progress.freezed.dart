// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'user_progress.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$UserProgress {

/// Current streak length in days.
 int get streak;/// Lifetime accumulated academic XP.
 int get totalXp;/// Current level, derived from [totalXp].
 int get level;/// Distinct words the learner has mastered.
 int get wordsLearned;/// Number of lessons completed.
 int get lessonsCompleted;/// Last day the learner was active, used for streak / ember decay.
 DateTime? get lastActiveAt;
/// Create a copy of UserProgress
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$UserProgressCopyWith<UserProgress> get copyWith => _$UserProgressCopyWithImpl<UserProgress>(this as UserProgress, _$identity);

  /// Serializes this UserProgress to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is UserProgress&&(identical(other.streak, streak) || other.streak == streak)&&(identical(other.totalXp, totalXp) || other.totalXp == totalXp)&&(identical(other.level, level) || other.level == level)&&(identical(other.wordsLearned, wordsLearned) || other.wordsLearned == wordsLearned)&&(identical(other.lessonsCompleted, lessonsCompleted) || other.lessonsCompleted == lessonsCompleted)&&(identical(other.lastActiveAt, lastActiveAt) || other.lastActiveAt == lastActiveAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,streak,totalXp,level,wordsLearned,lessonsCompleted,lastActiveAt);

@override
String toString() {
  return 'UserProgress(streak: $streak, totalXp: $totalXp, level: $level, wordsLearned: $wordsLearned, lessonsCompleted: $lessonsCompleted, lastActiveAt: $lastActiveAt)';
}


}

/// @nodoc
abstract mixin class $UserProgressCopyWith<$Res>  {
  factory $UserProgressCopyWith(UserProgress value, $Res Function(UserProgress) _then) = _$UserProgressCopyWithImpl;
@useResult
$Res call({
 int streak, int totalXp, int level, int wordsLearned, int lessonsCompleted, DateTime? lastActiveAt
});




}
/// @nodoc
class _$UserProgressCopyWithImpl<$Res>
    implements $UserProgressCopyWith<$Res> {
  _$UserProgressCopyWithImpl(this._self, this._then);

  final UserProgress _self;
  final $Res Function(UserProgress) _then;

/// Create a copy of UserProgress
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? streak = null,Object? totalXp = null,Object? level = null,Object? wordsLearned = null,Object? lessonsCompleted = null,Object? lastActiveAt = freezed,}) {
  return _then(_self.copyWith(
streak: null == streak ? _self.streak : streak // ignore: cast_nullable_to_non_nullable
as int,totalXp: null == totalXp ? _self.totalXp : totalXp // ignore: cast_nullable_to_non_nullable
as int,level: null == level ? _self.level : level // ignore: cast_nullable_to_non_nullable
as int,wordsLearned: null == wordsLearned ? _self.wordsLearned : wordsLearned // ignore: cast_nullable_to_non_nullable
as int,lessonsCompleted: null == lessonsCompleted ? _self.lessonsCompleted : lessonsCompleted // ignore: cast_nullable_to_non_nullable
as int,lastActiveAt: freezed == lastActiveAt ? _self.lastActiveAt : lastActiveAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

}


/// Adds pattern-matching-related methods to [UserProgress].
extension UserProgressPatterns on UserProgress {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _UserProgress value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _UserProgress() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _UserProgress value)  $default,){
final _that = this;
switch (_that) {
case _UserProgress():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _UserProgress value)?  $default,){
final _that = this;
switch (_that) {
case _UserProgress() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( int streak,  int totalXp,  int level,  int wordsLearned,  int lessonsCompleted,  DateTime? lastActiveAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _UserProgress() when $default != null:
return $default(_that.streak,_that.totalXp,_that.level,_that.wordsLearned,_that.lessonsCompleted,_that.lastActiveAt);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( int streak,  int totalXp,  int level,  int wordsLearned,  int lessonsCompleted,  DateTime? lastActiveAt)  $default,) {final _that = this;
switch (_that) {
case _UserProgress():
return $default(_that.streak,_that.totalXp,_that.level,_that.wordsLearned,_that.lessonsCompleted,_that.lastActiveAt);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( int streak,  int totalXp,  int level,  int wordsLearned,  int lessonsCompleted,  DateTime? lastActiveAt)?  $default,) {final _that = this;
switch (_that) {
case _UserProgress() when $default != null:
return $default(_that.streak,_that.totalXp,_that.level,_that.wordsLearned,_that.lessonsCompleted,_that.lastActiveAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _UserProgress extends UserProgress {
  const _UserProgress({this.streak = 0, this.totalXp = 0, this.level = 1, this.wordsLearned = 0, this.lessonsCompleted = 0, this.lastActiveAt}): super._();
  factory _UserProgress.fromJson(Map<String, dynamic> json) => _$UserProgressFromJson(json);

/// Current streak length in days.
@override@JsonKey() final  int streak;
/// Lifetime accumulated academic XP.
@override@JsonKey() final  int totalXp;
/// Current level, derived from [totalXp].
@override@JsonKey() final  int level;
/// Distinct words the learner has mastered.
@override@JsonKey() final  int wordsLearned;
/// Number of lessons completed.
@override@JsonKey() final  int lessonsCompleted;
/// Last day the learner was active, used for streak / ember decay.
@override final  DateTime? lastActiveAt;

/// Create a copy of UserProgress
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$UserProgressCopyWith<_UserProgress> get copyWith => __$UserProgressCopyWithImpl<_UserProgress>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$UserProgressToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _UserProgress&&(identical(other.streak, streak) || other.streak == streak)&&(identical(other.totalXp, totalXp) || other.totalXp == totalXp)&&(identical(other.level, level) || other.level == level)&&(identical(other.wordsLearned, wordsLearned) || other.wordsLearned == wordsLearned)&&(identical(other.lessonsCompleted, lessonsCompleted) || other.lessonsCompleted == lessonsCompleted)&&(identical(other.lastActiveAt, lastActiveAt) || other.lastActiveAt == lastActiveAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,streak,totalXp,level,wordsLearned,lessonsCompleted,lastActiveAt);

@override
String toString() {
  return 'UserProgress(streak: $streak, totalXp: $totalXp, level: $level, wordsLearned: $wordsLearned, lessonsCompleted: $lessonsCompleted, lastActiveAt: $lastActiveAt)';
}


}

/// @nodoc
abstract mixin class _$UserProgressCopyWith<$Res> implements $UserProgressCopyWith<$Res> {
  factory _$UserProgressCopyWith(_UserProgress value, $Res Function(_UserProgress) _then) = __$UserProgressCopyWithImpl;
@override @useResult
$Res call({
 int streak, int totalXp, int level, int wordsLearned, int lessonsCompleted, DateTime? lastActiveAt
});




}
/// @nodoc
class __$UserProgressCopyWithImpl<$Res>
    implements _$UserProgressCopyWith<$Res> {
  __$UserProgressCopyWithImpl(this._self, this._then);

  final _UserProgress _self;
  final $Res Function(_UserProgress) _then;

/// Create a copy of UserProgress
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? streak = null,Object? totalXp = null,Object? level = null,Object? wordsLearned = null,Object? lessonsCompleted = null,Object? lastActiveAt = freezed,}) {
  return _then(_UserProgress(
streak: null == streak ? _self.streak : streak // ignore: cast_nullable_to_non_nullable
as int,totalXp: null == totalXp ? _self.totalXp : totalXp // ignore: cast_nullable_to_non_nullable
as int,level: null == level ? _self.level : level // ignore: cast_nullable_to_non_nullable
as int,wordsLearned: null == wordsLearned ? _self.wordsLearned : wordsLearned // ignore: cast_nullable_to_non_nullable
as int,lessonsCompleted: null == lessonsCompleted ? _self.lessonsCompleted : lessonsCompleted // ignore: cast_nullable_to_non_nullable
as int,lastActiveAt: freezed == lastActiveAt ? _self.lastActiveAt : lastActiveAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}


}

// dart format on
