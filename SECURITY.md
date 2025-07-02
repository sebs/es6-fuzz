# Security Policy

## Supported Versions

The following versions of es6-fuzz are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 6.0.x   | :white_check_mark: |
| 5.x.x   | :x:                |
| 4.x.x   | :x:                |
| < 4.0   | :x:                |

## Reporting a Vulnerability

**DO NOT create a public GitHub issue for security vulnerabilities.** All security bugs should be reported privately to ensure the safety of our users.

### GitHub Private Vulnerability Reporting (Recommended)

If you're using GitHub, you can report vulnerabilities directly through our private reporting system:

1. Go to the [Security tab](https://github.com/sebs/es6-fuzz/security) of this repository
2. Click "Report a vulnerability"
3. Fill out the form with your findings

This method integrates with GitHub's security advisory system and allows for coordinated disclosure.

### Email Reporting

For more complex reports or if you prefer email communication:

**Email:** security+sebs@2xs.org

### What to Include in Your Report

Please include the following information in your report:

- **Vulnerability Type**: What kind of security issue (e.g., code injection, XSS, prototype pollution)
- **Affected Component**: Which part of es6-fuzz is affected (e.g., specific fuzzifier, logic operations)
- **Impact Assessment**: Potential impact on applications using es6-fuzz
- **Reproduction Steps**: Clear, step-by-step instructions to reproduce the issue
- **Proof of Concept**: Working example demonstrating the vulnerability
- **Affected Versions**: Which versions of es6-fuzz are vulnerable
- **Suggested Fix**: Any ideas for mitigation or fixes (optional but appreciated)

## Our Disclosure Process

1. **Acknowledgement**: We will acknowledge receipt of your report within **48 hours**
2. **Initial Assessment**: Our team will investigate and provide an initial assessment within **5 business days**
3. **Regular Updates**: We will provide updates on our progress every **7 days** until resolution
4. **Fix Development**: We aim to develop and test fixes within **60 days** for critical vulnerabilities, **90 days** for others
5. **Coordinated Disclosure**: We will work with you to coordinate public disclosure timing
6. **Security Advisory**: For confirmed vulnerabilities, we will publish a GitHub Security Advisory
7. **Recognition**: We will publicly credit you in the security advisory and release notes, unless you prefer to remain anonymous

## Scope

This security policy applies to the core es6-fuzz library and its official distribution channels.

### In Scope

- **Core Library**: All code in the main es6-fuzz repository
- **NPM Package**: The official `es6-fuzz` package on npmjs.com
- **Supported Versions**: Currently supported versions listed above
- **Dependencies**: Security issues in our direct dependencies that affect es6-fuzz

### Vulnerability Types We're Interested In

- **Code Injection**: Ability to execute arbitrary code through fuzzy logic inputs
- **Prototype Pollution**: Manipulation of JavaScript object prototypes
- **Denial of Service**: Inputs that cause excessive resource consumption
- **Logic Bypass**: Ways to circumvent intended fuzzy logic behavior
- **Supply Chain**: Compromised dependencies or build process issues

### Out of Scope

The following are considered out of scope for this security policy:

- **Theoretical Vulnerabilities**: Issues without practical exploitation scenarios
- **Social Engineering**: Attacks targeting project maintainers or users
- **Physical Access**: Attacks requiring physical access to systems
- **Brute Force**: Attacks requiring excessive computational resources
- **Third-Party Applications**: Vulnerabilities in applications that use es6-fuzz (unless caused by es6-fuzz itself)
- **Development Dependencies**: Issues in devDependencies that don't affect the published package
- **Documentation**: Typos or errors in documentation that don't create security risks

## Safe Harbor

We consider security research and vulnerability disclosure activities conducted under this policy to be authorized and welcome. We will not pursue civil or criminal action, or send a cease and desist, against researchers who:

- Act in good faith and adhere to this policy
- Make a reasonable effort to avoid privacy violations and service disruption
- Do not access or modify data belonging to others
- Report vulnerabilities promptly and work with us on coordinated disclosure

We consider your activities to be a benefit to our community and will work with you to understand and resolve issues quickly.

## Recognition & Rewards

While we do not currently offer a monetary bug bounty program, we deeply value the work of security researchers. We are happy to provide:

- **Public Recognition**: Credit in our security advisories and release notes
- **GitHub Security Advisory**: Co-author credit on published security advisories
- **Community Recognition**: Mention in our project documentation and website
- **Direct Communication**: Access to our development team for technical discussions

## Special Considerations for es6-fuzz

### Experimental Nature

Please note that es6-fuzz is explicitly marked as an experimental library. While we take security seriously, users should be aware that:

- The API may change between versions
- Thorough security review may be limited due to the experimental status
- Production use should include additional security considerations

### JavaScript-Specific Concerns

As a JavaScript library, es6-fuzz may be particularly susceptible to:

- **Input Validation Issues**: Malformed inputs to fuzzy logic functions
- **Prototype Pollution**: Manipulation of JavaScript object prototypes
- **Type Confusion**: Unexpected behavior with different JavaScript types
- **Performance Issues**: Inputs that cause excessive computation

### Integration Security

When reporting vulnerabilities, please consider:

- **Client-Side Usage**: How the vulnerability affects browser-based applications
- **Server-Side Usage**: Impact on Node.js applications using es6-fuzz
- **Data Flow**: How untrusted data might reach vulnerable code paths

## GitHub Security Advisory Integration

This project uses GitHub's Security Advisory system for coordinated vulnerability disclosure. When you report a vulnerability:

1. **Draft Advisory**: We'll create a draft security advisory for collaboration
2. **Private Discussion**: We can discuss the vulnerability privately within the advisory
3. **CVE Assignment**: GitHub can assign CVE numbers for significant vulnerabilities
4. **Coordinated Publication**: We'll coordinate the public disclosure timing with you
5. **Dependabot Alerts**: Published advisories will trigger alerts for downstream users

## Questions?

If you have questions about this policy or need clarification on any aspect of our security reporting process, please contact us at security+sebs@2xs.org.

## Updates to This Policy

This security policy may be updated from time to time. We will announce significant changes through our usual communication channels (GitHub releases, npm package updates).
