import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from '@src/routes/hooks';

import Iconify from '@src/components/iconify';
import SearchNotFound from '@src/components/search-not-found';

import { IRestaurant } from '@src/types/restaurant';

// ----------------------------------------------------------------------

type Props = {
  query: string;
  results: IRestaurant[];
  onSearch: (inputValue: string) => void;
  hrefItem: (id: string) => string;
  loading?: boolean;
};

export default function RestaurantSearch({ query, results, onSearch, hrefItem, loading }: Props) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(hrefItem(id));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (query) {
      if (event.key === 'Enter') {
        const selectItem = results.filter((item) => item.name === query)[0];

        handleClick(selectItem.id);
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 260 } }}
      loading={loading}
      autoHighlight
      popupIcon={null}
      options={results}
      onInputChange={(_event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option.name}
      noOptionsText={<SearchNotFound query={query} sx={{ bgcolor: 'unset' }} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        popper: {
          placement: 'bottom-start',
          sx: {
            minWidth: 320,
          },
        },
        paper: {
          sx: {
            [` .${autocompleteClasses.option}`]: {
              pl: 0.75,
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {loading ? <Iconify icon="svg-spinners:8-dots-rotate" sx={{ mr: -3 }} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
      renderOption={(props, item, { inputValue }) => {
        const matches = match(item.name, inputValue);
        const parts = parse(item.name, matches);

        return (
          <Box component="li" {...props} onClick={() => handleClick(item.id)} key={item.id}>
            <Avatar
              key={item.id}
              alt={item.name}
              src={item.photos[0]}
              variant="rounded"
              sx={{
                width: 48,
                height: 48,
                flexShrink: 0,
                mr: 1.5,
                borderRadius: 1,
              }}
            />

            <div key={inputValue}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </div>
          </Box>
        );
      }}
    />
  );
}
