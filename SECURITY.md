# Security notes — top-up vault

| Mitigated | Behavior |
| --- | --- |
| Bad calls / need | refused |
| Vault empty | refused |
| Overflow | refused |
| Prefer free/paid first | no unnecessary transfer plan |

Production: auth on vault moves; confirm oracle credit after real transfer.
