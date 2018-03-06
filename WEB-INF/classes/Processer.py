#!/usr/bin/python
# -*- coding: UTF-8 -*-

import sys
import math

result = None
code = """
def handler(list, str):
	D = list[0]
	S = list[1]
	L = list[2]
	exec str
	return result
"""

if __name__ == '__main__':
	exec code