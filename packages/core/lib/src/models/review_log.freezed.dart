// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'review_log.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$ReviewLog {

 String get id;/// Id of the review card that was reviewed.
 String get cardId;/// The rating the learner gave.
 ReviewRating get rating;/// When the review happened.
 DateTime get reviewedAt;/// Interval (days) the card was scheduled for as a result of this review.
 int get scheduledDays;
/// Create a copy of ReviewLog
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ReviewLogCopyWith<ReviewLog> get copyWith => _$ReviewLogCopyWithImpl<ReviewLog>(this as ReviewLog, _$identity);

  /// Serializes this ReviewLog to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ReviewLog&&(identical(other.id, id) || other.id == id)&&(identical(other.cardId, cardId) || other.cardId == cardId)&&(identical(other.rating, rating) || other.rating == rating)&&(identical(other.reviewedAt, reviewedAt) || other.reviewedAt == reviewedAt)&&(identical(other.scheduledDays, scheduledDays) || other.scheduledDays == scheduledDays));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,cardId,rating,reviewedAt,scheduledDays);

@override
String toString() {
  return 'ReviewLog(id: $id, cardId: $cardId, rating: $rating, reviewedAt: $reviewedAt, scheduledDays: $scheduledDays)';
}


}

/// @nodoc
abstract mixin class $ReviewLogCopyWith<$Res>  {
  factory $ReviewLogCopyWith(ReviewLog value, $Res Function(ReviewLog) _then) = _$ReviewLogCopyWithImpl;
@useResult
$Res call({
 String id, String cardId, ReviewRating rating, DateTime reviewedAt, int scheduledDays
});




}
/// @nodoc
class _$ReviewLogCopyWithImpl<$Res>
    implements $ReviewLogCopyWith<$Res> {
  _$ReviewLogCopyWithImpl(this._self, this._then);

  final ReviewLog _self;
  final $Res Function(ReviewLog) _then;

/// Create a copy of ReviewLog
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? cardId = null,Object? rating = null,Object? reviewedAt = null,Object? scheduledDays = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,cardId: null == cardId ? _self.cardId : cardId // ignore: cast_nullable_to_non_nullable
as String,rating: null == rating ? _self.rating : rating // ignore: cast_nullable_to_non_nullable
as ReviewRating,reviewedAt: null == reviewedAt ? _self.reviewedAt : reviewedAt // ignore: cast_nullable_to_non_nullable
as DateTime,scheduledDays: null == scheduledDays ? _self.scheduledDays : scheduledDays // ignore: cast_nullable_to_non_nullable
as int,
  ));
}

}


/// Adds pattern-matching-related methods to [ReviewLog].
extension ReviewLogPatterns on ReviewLog {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ReviewLog value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ReviewLog() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ReviewLog value)  $default,){
final _that = this;
switch (_that) {
case _ReviewLog():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ReviewLog value)?  $default,){
final _that = this;
switch (_that) {
case _ReviewLog() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String cardId,  ReviewRating rating,  DateTime reviewedAt,  int scheduledDays)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ReviewLog() when $default != null:
return $default(_that.id,_that.cardId,_that.rating,_that.reviewedAt,_that.scheduledDays);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String cardId,  ReviewRating rating,  DateTime reviewedAt,  int scheduledDays)  $default,) {final _that = this;
switch (_that) {
case _ReviewLog():
return $default(_that.id,_that.cardId,_that.rating,_that.reviewedAt,_that.scheduledDays);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String cardId,  ReviewRating rating,  DateTime reviewedAt,  int scheduledDays)?  $default,) {final _that = this;
switch (_that) {
case _ReviewLog() when $default != null:
return $default(_that.id,_that.cardId,_that.rating,_that.reviewedAt,_that.scheduledDays);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ReviewLog implements ReviewLog {
  const _ReviewLog({required this.id, required this.cardId, required this.rating, required this.reviewedAt, required this.scheduledDays});
  factory _ReviewLog.fromJson(Map<String, dynamic> json) => _$ReviewLogFromJson(json);

@override final  String id;
/// Id of the review card that was reviewed.
@override final  String cardId;
/// The rating the learner gave.
@override final  ReviewRating rating;
/// When the review happened.
@override final  DateTime reviewedAt;
/// Interval (days) the card was scheduled for as a result of this review.
@override final  int scheduledDays;

/// Create a copy of ReviewLog
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ReviewLogCopyWith<_ReviewLog> get copyWith => __$ReviewLogCopyWithImpl<_ReviewLog>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ReviewLogToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ReviewLog&&(identical(other.id, id) || other.id == id)&&(identical(other.cardId, cardId) || other.cardId == cardId)&&(identical(other.rating, rating) || other.rating == rating)&&(identical(other.reviewedAt, reviewedAt) || other.reviewedAt == reviewedAt)&&(identical(other.scheduledDays, scheduledDays) || other.scheduledDays == scheduledDays));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,cardId,rating,reviewedAt,scheduledDays);

@override
String toString() {
  return 'ReviewLog(id: $id, cardId: $cardId, rating: $rating, reviewedAt: $reviewedAt, scheduledDays: $scheduledDays)';
}


}

/// @nodoc
abstract mixin class _$ReviewLogCopyWith<$Res> implements $ReviewLogCopyWith<$Res> {
  factory _$ReviewLogCopyWith(_ReviewLog value, $Res Function(_ReviewLog) _then) = __$ReviewLogCopyWithImpl;
@override @useResult
$Res call({
 String id, String cardId, ReviewRating rating, DateTime reviewedAt, int scheduledDays
});




}
/// @nodoc
class __$ReviewLogCopyWithImpl<$Res>
    implements _$ReviewLogCopyWith<$Res> {
  __$ReviewLogCopyWithImpl(this._self, this._then);

  final _ReviewLog _self;
  final $Res Function(_ReviewLog) _then;

/// Create a copy of ReviewLog
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? cardId = null,Object? rating = null,Object? reviewedAt = null,Object? scheduledDays = null,}) {
  return _then(_ReviewLog(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,cardId: null == cardId ? _self.cardId : cardId // ignore: cast_nullable_to_non_nullable
as String,rating: null == rating ? _self.rating : rating // ignore: cast_nullable_to_non_nullable
as ReviewRating,reviewedAt: null == reviewedAt ? _self.reviewedAt : reviewedAt // ignore: cast_nullable_to_non_nullable
as DateTime,scheduledDays: null == scheduledDays ? _self.scheduledDays : scheduledDays // ignore: cast_nullable_to_non_nullable
as int,
  ));
}


}

// dart format on
