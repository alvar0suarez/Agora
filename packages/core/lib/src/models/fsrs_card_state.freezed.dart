// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'fsrs_card_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$FsrsCardState {

/// When the card is next due for review.
 DateTime get due;/// FSRS memory stability (days). Higher = remembered longer.
 double get stability;/// FSRS difficulty (roughly 1–10). Higher = harder to retain.
 double get difficulty;/// Days elapsed since the previous review when last scheduled.
 int get elapsedDays;/// Interval (days) assigned at the last review.
 int get scheduledDays;/// Total number of reviews.
 int get reps;/// Number of times the card lapsed (rated Again while in review).
 int get lapses;/// Lifecycle state of the card.
 FsrsState get state;/// Timestamp of the last review, or null if never reviewed.
 DateTime? get lastReview;
/// Create a copy of FsrsCardState
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$FsrsCardStateCopyWith<FsrsCardState> get copyWith => _$FsrsCardStateCopyWithImpl<FsrsCardState>(this as FsrsCardState, _$identity);

  /// Serializes this FsrsCardState to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is FsrsCardState&&(identical(other.due, due) || other.due == due)&&(identical(other.stability, stability) || other.stability == stability)&&(identical(other.difficulty, difficulty) || other.difficulty == difficulty)&&(identical(other.elapsedDays, elapsedDays) || other.elapsedDays == elapsedDays)&&(identical(other.scheduledDays, scheduledDays) || other.scheduledDays == scheduledDays)&&(identical(other.reps, reps) || other.reps == reps)&&(identical(other.lapses, lapses) || other.lapses == lapses)&&(identical(other.state, state) || other.state == state)&&(identical(other.lastReview, lastReview) || other.lastReview == lastReview));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,due,stability,difficulty,elapsedDays,scheduledDays,reps,lapses,state,lastReview);

@override
String toString() {
  return 'FsrsCardState(due: $due, stability: $stability, difficulty: $difficulty, elapsedDays: $elapsedDays, scheduledDays: $scheduledDays, reps: $reps, lapses: $lapses, state: $state, lastReview: $lastReview)';
}


}

/// @nodoc
abstract mixin class $FsrsCardStateCopyWith<$Res>  {
  factory $FsrsCardStateCopyWith(FsrsCardState value, $Res Function(FsrsCardState) _then) = _$FsrsCardStateCopyWithImpl;
@useResult
$Res call({
 DateTime due, double stability, double difficulty, int elapsedDays, int scheduledDays, int reps, int lapses, FsrsState state, DateTime? lastReview
});




}
/// @nodoc
class _$FsrsCardStateCopyWithImpl<$Res>
    implements $FsrsCardStateCopyWith<$Res> {
  _$FsrsCardStateCopyWithImpl(this._self, this._then);

  final FsrsCardState _self;
  final $Res Function(FsrsCardState) _then;

/// Create a copy of FsrsCardState
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? due = null,Object? stability = null,Object? difficulty = null,Object? elapsedDays = null,Object? scheduledDays = null,Object? reps = null,Object? lapses = null,Object? state = null,Object? lastReview = freezed,}) {
  return _then(_self.copyWith(
due: null == due ? _self.due : due // ignore: cast_nullable_to_non_nullable
as DateTime,stability: null == stability ? _self.stability : stability // ignore: cast_nullable_to_non_nullable
as double,difficulty: null == difficulty ? _self.difficulty : difficulty // ignore: cast_nullable_to_non_nullable
as double,elapsedDays: null == elapsedDays ? _self.elapsedDays : elapsedDays // ignore: cast_nullable_to_non_nullable
as int,scheduledDays: null == scheduledDays ? _self.scheduledDays : scheduledDays // ignore: cast_nullable_to_non_nullable
as int,reps: null == reps ? _self.reps : reps // ignore: cast_nullable_to_non_nullable
as int,lapses: null == lapses ? _self.lapses : lapses // ignore: cast_nullable_to_non_nullable
as int,state: null == state ? _self.state : state // ignore: cast_nullable_to_non_nullable
as FsrsState,lastReview: freezed == lastReview ? _self.lastReview : lastReview // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

}


/// Adds pattern-matching-related methods to [FsrsCardState].
extension FsrsCardStatePatterns on FsrsCardState {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _FsrsCardState value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _FsrsCardState() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _FsrsCardState value)  $default,){
final _that = this;
switch (_that) {
case _FsrsCardState():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _FsrsCardState value)?  $default,){
final _that = this;
switch (_that) {
case _FsrsCardState() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( DateTime due,  double stability,  double difficulty,  int elapsedDays,  int scheduledDays,  int reps,  int lapses,  FsrsState state,  DateTime? lastReview)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _FsrsCardState() when $default != null:
return $default(_that.due,_that.stability,_that.difficulty,_that.elapsedDays,_that.scheduledDays,_that.reps,_that.lapses,_that.state,_that.lastReview);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( DateTime due,  double stability,  double difficulty,  int elapsedDays,  int scheduledDays,  int reps,  int lapses,  FsrsState state,  DateTime? lastReview)  $default,) {final _that = this;
switch (_that) {
case _FsrsCardState():
return $default(_that.due,_that.stability,_that.difficulty,_that.elapsedDays,_that.scheduledDays,_that.reps,_that.lapses,_that.state,_that.lastReview);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( DateTime due,  double stability,  double difficulty,  int elapsedDays,  int scheduledDays,  int reps,  int lapses,  FsrsState state,  DateTime? lastReview)?  $default,) {final _that = this;
switch (_that) {
case _FsrsCardState() when $default != null:
return $default(_that.due,_that.stability,_that.difficulty,_that.elapsedDays,_that.scheduledDays,_that.reps,_that.lapses,_that.state,_that.lastReview);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _FsrsCardState extends FsrsCardState {
  const _FsrsCardState({required this.due, this.stability = 0, this.difficulty = 0, this.elapsedDays = 0, this.scheduledDays = 0, this.reps = 0, this.lapses = 0, this.state = FsrsState.newCard, this.lastReview}): super._();
  factory _FsrsCardState.fromJson(Map<String, dynamic> json) => _$FsrsCardStateFromJson(json);

/// When the card is next due for review.
@override final  DateTime due;
/// FSRS memory stability (days). Higher = remembered longer.
@override@JsonKey() final  double stability;
/// FSRS difficulty (roughly 1–10). Higher = harder to retain.
@override@JsonKey() final  double difficulty;
/// Days elapsed since the previous review when last scheduled.
@override@JsonKey() final  int elapsedDays;
/// Interval (days) assigned at the last review.
@override@JsonKey() final  int scheduledDays;
/// Total number of reviews.
@override@JsonKey() final  int reps;
/// Number of times the card lapsed (rated Again while in review).
@override@JsonKey() final  int lapses;
/// Lifecycle state of the card.
@override@JsonKey() final  FsrsState state;
/// Timestamp of the last review, or null if never reviewed.
@override final  DateTime? lastReview;

/// Create a copy of FsrsCardState
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$FsrsCardStateCopyWith<_FsrsCardState> get copyWith => __$FsrsCardStateCopyWithImpl<_FsrsCardState>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$FsrsCardStateToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _FsrsCardState&&(identical(other.due, due) || other.due == due)&&(identical(other.stability, stability) || other.stability == stability)&&(identical(other.difficulty, difficulty) || other.difficulty == difficulty)&&(identical(other.elapsedDays, elapsedDays) || other.elapsedDays == elapsedDays)&&(identical(other.scheduledDays, scheduledDays) || other.scheduledDays == scheduledDays)&&(identical(other.reps, reps) || other.reps == reps)&&(identical(other.lapses, lapses) || other.lapses == lapses)&&(identical(other.state, state) || other.state == state)&&(identical(other.lastReview, lastReview) || other.lastReview == lastReview));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,due,stability,difficulty,elapsedDays,scheduledDays,reps,lapses,state,lastReview);

@override
String toString() {
  return 'FsrsCardState(due: $due, stability: $stability, difficulty: $difficulty, elapsedDays: $elapsedDays, scheduledDays: $scheduledDays, reps: $reps, lapses: $lapses, state: $state, lastReview: $lastReview)';
}


}

/// @nodoc
abstract mixin class _$FsrsCardStateCopyWith<$Res> implements $FsrsCardStateCopyWith<$Res> {
  factory _$FsrsCardStateCopyWith(_FsrsCardState value, $Res Function(_FsrsCardState) _then) = __$FsrsCardStateCopyWithImpl;
@override @useResult
$Res call({
 DateTime due, double stability, double difficulty, int elapsedDays, int scheduledDays, int reps, int lapses, FsrsState state, DateTime? lastReview
});




}
/// @nodoc
class __$FsrsCardStateCopyWithImpl<$Res>
    implements _$FsrsCardStateCopyWith<$Res> {
  __$FsrsCardStateCopyWithImpl(this._self, this._then);

  final _FsrsCardState _self;
  final $Res Function(_FsrsCardState) _then;

/// Create a copy of FsrsCardState
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? due = null,Object? stability = null,Object? difficulty = null,Object? elapsedDays = null,Object? scheduledDays = null,Object? reps = null,Object? lapses = null,Object? state = null,Object? lastReview = freezed,}) {
  return _then(_FsrsCardState(
due: null == due ? _self.due : due // ignore: cast_nullable_to_non_nullable
as DateTime,stability: null == stability ? _self.stability : stability // ignore: cast_nullable_to_non_nullable
as double,difficulty: null == difficulty ? _self.difficulty : difficulty // ignore: cast_nullable_to_non_nullable
as double,elapsedDays: null == elapsedDays ? _self.elapsedDays : elapsedDays // ignore: cast_nullable_to_non_nullable
as int,scheduledDays: null == scheduledDays ? _self.scheduledDays : scheduledDays // ignore: cast_nullable_to_non_nullable
as int,reps: null == reps ? _self.reps : reps // ignore: cast_nullable_to_non_nullable
as int,lapses: null == lapses ? _self.lapses : lapses // ignore: cast_nullable_to_non_nullable
as int,state: null == state ? _self.state : state // ignore: cast_nullable_to_non_nullable
as FsrsState,lastReview: freezed == lastReview ? _self.lastReview : lastReview // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}


}

// dart format on
