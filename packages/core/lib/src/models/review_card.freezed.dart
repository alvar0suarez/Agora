// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'review_card.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$ReviewCard {

 String get id;/// Id of the word this card reviews.
 String get wordId;/// Prompt shown to the learner.
 String get front;/// Expected answer.
 String get back; CardType get cardType; FsrsCardState get fsrsState; DateTime get createdAt;
/// Create a copy of ReviewCard
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ReviewCardCopyWith<ReviewCard> get copyWith => _$ReviewCardCopyWithImpl<ReviewCard>(this as ReviewCard, _$identity);

  /// Serializes this ReviewCard to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ReviewCard&&(identical(other.id, id) || other.id == id)&&(identical(other.wordId, wordId) || other.wordId == wordId)&&(identical(other.front, front) || other.front == front)&&(identical(other.back, back) || other.back == back)&&(identical(other.cardType, cardType) || other.cardType == cardType)&&(identical(other.fsrsState, fsrsState) || other.fsrsState == fsrsState)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,wordId,front,back,cardType,fsrsState,createdAt);

@override
String toString() {
  return 'ReviewCard(id: $id, wordId: $wordId, front: $front, back: $back, cardType: $cardType, fsrsState: $fsrsState, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class $ReviewCardCopyWith<$Res>  {
  factory $ReviewCardCopyWith(ReviewCard value, $Res Function(ReviewCard) _then) = _$ReviewCardCopyWithImpl;
@useResult
$Res call({
 String id, String wordId, String front, String back, CardType cardType, FsrsCardState fsrsState, DateTime createdAt
});


$FsrsCardStateCopyWith<$Res> get fsrsState;

}
/// @nodoc
class _$ReviewCardCopyWithImpl<$Res>
    implements $ReviewCardCopyWith<$Res> {
  _$ReviewCardCopyWithImpl(this._self, this._then);

  final ReviewCard _self;
  final $Res Function(ReviewCard) _then;

/// Create a copy of ReviewCard
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? wordId = null,Object? front = null,Object? back = null,Object? cardType = null,Object? fsrsState = null,Object? createdAt = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,wordId: null == wordId ? _self.wordId : wordId // ignore: cast_nullable_to_non_nullable
as String,front: null == front ? _self.front : front // ignore: cast_nullable_to_non_nullable
as String,back: null == back ? _self.back : back // ignore: cast_nullable_to_non_nullable
as String,cardType: null == cardType ? _self.cardType : cardType // ignore: cast_nullable_to_non_nullable
as CardType,fsrsState: null == fsrsState ? _self.fsrsState : fsrsState // ignore: cast_nullable_to_non_nullable
as FsrsCardState,createdAt: null == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime,
  ));
}
/// Create a copy of ReviewCard
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$FsrsCardStateCopyWith<$Res> get fsrsState {
  
  return $FsrsCardStateCopyWith<$Res>(_self.fsrsState, (value) {
    return _then(_self.copyWith(fsrsState: value));
  });
}
}


/// Adds pattern-matching-related methods to [ReviewCard].
extension ReviewCardPatterns on ReviewCard {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ReviewCard value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ReviewCard() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ReviewCard value)  $default,){
final _that = this;
switch (_that) {
case _ReviewCard():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ReviewCard value)?  $default,){
final _that = this;
switch (_that) {
case _ReviewCard() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String wordId,  String front,  String back,  CardType cardType,  FsrsCardState fsrsState,  DateTime createdAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ReviewCard() when $default != null:
return $default(_that.id,_that.wordId,_that.front,_that.back,_that.cardType,_that.fsrsState,_that.createdAt);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String wordId,  String front,  String back,  CardType cardType,  FsrsCardState fsrsState,  DateTime createdAt)  $default,) {final _that = this;
switch (_that) {
case _ReviewCard():
return $default(_that.id,_that.wordId,_that.front,_that.back,_that.cardType,_that.fsrsState,_that.createdAt);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String wordId,  String front,  String back,  CardType cardType,  FsrsCardState fsrsState,  DateTime createdAt)?  $default,) {final _that = this;
switch (_that) {
case _ReviewCard() when $default != null:
return $default(_that.id,_that.wordId,_that.front,_that.back,_that.cardType,_that.fsrsState,_that.createdAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ReviewCard implements ReviewCard {
  const _ReviewCard({required this.id, required this.wordId, required this.front, required this.back, required this.cardType, required this.fsrsState, required this.createdAt});
  factory _ReviewCard.fromJson(Map<String, dynamic> json) => _$ReviewCardFromJson(json);

@override final  String id;
/// Id of the word this card reviews.
@override final  String wordId;
/// Prompt shown to the learner.
@override final  String front;
/// Expected answer.
@override final  String back;
@override final  CardType cardType;
@override final  FsrsCardState fsrsState;
@override final  DateTime createdAt;

/// Create a copy of ReviewCard
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ReviewCardCopyWith<_ReviewCard> get copyWith => __$ReviewCardCopyWithImpl<_ReviewCard>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ReviewCardToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ReviewCard&&(identical(other.id, id) || other.id == id)&&(identical(other.wordId, wordId) || other.wordId == wordId)&&(identical(other.front, front) || other.front == front)&&(identical(other.back, back) || other.back == back)&&(identical(other.cardType, cardType) || other.cardType == cardType)&&(identical(other.fsrsState, fsrsState) || other.fsrsState == fsrsState)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,wordId,front,back,cardType,fsrsState,createdAt);

@override
String toString() {
  return 'ReviewCard(id: $id, wordId: $wordId, front: $front, back: $back, cardType: $cardType, fsrsState: $fsrsState, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class _$ReviewCardCopyWith<$Res> implements $ReviewCardCopyWith<$Res> {
  factory _$ReviewCardCopyWith(_ReviewCard value, $Res Function(_ReviewCard) _then) = __$ReviewCardCopyWithImpl;
@override @useResult
$Res call({
 String id, String wordId, String front, String back, CardType cardType, FsrsCardState fsrsState, DateTime createdAt
});


@override $FsrsCardStateCopyWith<$Res> get fsrsState;

}
/// @nodoc
class __$ReviewCardCopyWithImpl<$Res>
    implements _$ReviewCardCopyWith<$Res> {
  __$ReviewCardCopyWithImpl(this._self, this._then);

  final _ReviewCard _self;
  final $Res Function(_ReviewCard) _then;

/// Create a copy of ReviewCard
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? wordId = null,Object? front = null,Object? back = null,Object? cardType = null,Object? fsrsState = null,Object? createdAt = null,}) {
  return _then(_ReviewCard(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,wordId: null == wordId ? _self.wordId : wordId // ignore: cast_nullable_to_non_nullable
as String,front: null == front ? _self.front : front // ignore: cast_nullable_to_non_nullable
as String,back: null == back ? _self.back : back // ignore: cast_nullable_to_non_nullable
as String,cardType: null == cardType ? _self.cardType : cardType // ignore: cast_nullable_to_non_nullable
as CardType,fsrsState: null == fsrsState ? _self.fsrsState : fsrsState // ignore: cast_nullable_to_non_nullable
as FsrsCardState,createdAt: null == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime,
  ));
}

/// Create a copy of ReviewCard
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$FsrsCardStateCopyWith<$Res> get fsrsState {
  
  return $FsrsCardStateCopyWith<$Res>(_self.fsrsState, (value) {
    return _then(_self.copyWith(fsrsState: value));
  });
}
}

// dart format on
