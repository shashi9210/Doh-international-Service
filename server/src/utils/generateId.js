const crypto = require('crypto');

/**
 * Generates a unique Employee ID
 * Format: DOH-[BRANCH_CODE]-[YEAR]-[SEQUENCE]
 * Example: DOH-IT-2024-0042
 */
const generateEmployeeId = (branch) => {
    const year = new Date().getFullYear();
    const branchCode = branch.replace('DOH ', '').toUpperCase().substring(0, 3); // IT, RX, ASS, SHI
    const randomSeq = crypto.randomBytes(2).toString('hex').toUpperCase(); // 4 chars

    return `DOH-${branchCode}-${year}-${randomSeq}`;
};

module.exports = generateEmployeeId;
