import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { input } from "./SearchInput.module.scss";

// 搜尋輸入元件
const SearchInput = ({ inputValue, setInputValue, onSearch }) => {
	const handleFormSubmit = (event) => {
		event.preventDefault(); // 阻止表單預設送出行為，避免頁面跳轉
		onSearch(); // 執行搜尋
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<TextField
				label="搜尋文章標題"
				variant="outlined"
				margin="normal"
				value={inputValue}
				className={input}
				onChange={(e) => setInputValue(e.target.value)}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={onSearch} aria-label="搜尋">
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</form>
	);
};

export default SearchInput;
