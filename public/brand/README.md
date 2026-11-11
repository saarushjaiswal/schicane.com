# Schicane brand resources

The canonical logos are the two original PNGs supplied by Aarush:

- `schicane-gold-wordmark.png`: primary Schicane logo. Use whenever space permits.
- `schicane-gold-symbol.png`: standalone S with arrows. Use for compact placements and the favicon.

Preserve the original files. Do not redraw the name in a font as a substitute for the logo. The shared BrandLogo component frames the PNGs with SVG viewports without altering the artwork. CSS blends their black backgrounds with the site's dark surface.

`public/icon.svg` embeds the supplied S artwork in a square viewport. The social preview uses the full wordmark.

## Typography

The user originally identified Ethnocentric Bold Italic, then supplied a ZIP containing Ethnocentric Regular and the Typodermic Desktop EULA v260817. After the difference and embedding restriction were explained, the user selected fixed heading artwork made from this Regular font.

`headings/` contains whole-heading vector artwork. Each file contains a single fixed outline path, not individual addressable glyphs, a font, or a recombinable character library. Narrow-screen compositions are separately exported. The private source OTF and local export utilities are excluded from Git. The HeadingArtwork component keeps equivalent readable text inside semantic headings for accessibility and search. Unknown future headings fall back to Raleway; they do not generate new Ethnocentric lettering at runtime.

The included EULA sections 2.2 and 4.2 permit finished fixed artwork and editing of letterforms after conversion to artwork; sections 4.1, 4.3 and 4.5 restrict font sharing, webfont embedding, and reusable glyph products. No font software from that ZIP is distributed.

Body font: Raleway variable, from the official Google Fonts repository. The SIL Open Font License is included in `public/fonts/raleway-OFL.txt`.
