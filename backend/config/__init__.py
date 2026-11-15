# Ensure PyMySQL acts as MySQLdb if mysqlclient is not compiled
try:
    import pymysql
    pymysql.install_as_MySQLdb()
except ImportError:
    pass
