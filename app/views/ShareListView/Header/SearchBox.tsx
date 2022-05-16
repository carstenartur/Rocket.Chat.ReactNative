import React from 'react';
import { StyleSheet, Text, TextInput as RNTextInput, TextInputProps, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import { themes } from '../../../lib/constants';
import I18n from '../../../i18n';
import { CustomIcon } from '../../../containers/CustomIcon';
import TextInput from '../../../presentation/TextInput';
import { TSupportedThemes, useTheme } from '../../../theme';
import { isIOS, isAndroid } from '../../../utils/deviceInfo';
import sharedStyles from '../../Styles';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1
	},
	searchBox: {
		alignItems: 'center',
		borderRadius: 10,
		flexDirection: 'row',
		fontSize: 17,
		height: 36,
		margin: 16,
		marginVertical: 10,
		paddingHorizontal: 10,
		flex: 1
	},
	input: {
		flex: 1,
		fontSize: 17,
		marginLeft: 8,
		paddingTop: 0,
		paddingBottom: 0,
		...sharedStyles.textRegular
	},
	cancel: {
		marginRight: 15
	},
	cancelText: {
		...sharedStyles.textRegular,
		fontSize: 17
	},
	cancelIcon: {
		right: 5
	}
});

interface ISearchBox extends TextInputProps {
	value?: string;
	hasCancel?: boolean;
	hasCancelIcon?: boolean;
	onCancelPress?: () => void;
	inputRef?: React.Ref<RNTextInput>;
}

const CancelButton = ({ onCancelPress }: { onCancelPress?: () => void }) => {
	const { theme } = useTheme();
	return (
		<Touchable onPress={onCancelPress} style={styles.cancel}>
			<Text style={[styles.cancelText, { color: themes[theme].headerTintColor }]}>{I18n.t('Cancel')}</Text>
		</Touchable>
	);
};

const CancelIconButton = (onCancelPress: () => void, theme: TSupportedThemes) => (
	<Touchable onPress={onCancelPress} style={styles.cancelIcon}>
		<CustomIcon name='input-clear' size={18} color={themes[theme].auxiliaryText} />
	</Touchable>
);

const SearchBox = ({ hasCancel, onCancelPress, inputRef, hasCancelIcon = false, ...props }: ISearchBox): React.ReactElement => {
	const { theme } = useTheme();
	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: isIOS ? themes[theme].headerBackground : themes[theme].headerSecondaryBackground }
			]}>
			<View style={[styles.searchBox, { backgroundColor: themes[theme].searchboxBackground }]}>
				<CustomIcon name='search' size={14} color={themes[theme].auxiliaryText} />
				<TextInput
					ref={inputRef}
					autoCapitalize='none'
					autoCorrect={false}
					blurOnSubmit
					clearButtonMode='while-editing'
					placeholder={I18n.t('Search')}
					returnKeyType='search'
					style={styles.input}
					underlineColorAndroid='transparent'
					theme={theme}
					{...props}
				/>
				{isAndroid && hasCancelIcon && onCancelPress ? CancelIconButton(onCancelPress, theme) : null}
			</View>
			{hasCancel && onCancelPress ? <CancelButton onCancelPress={onCancelPress} /> : null}
		</View>
	);
};

export default SearchBox;