from db import get_connection
from models.rank_model import (
    get_daily_rank_query,
    get_weekly_rank_query,
    get_monthly_rank_query,
    get_keyword_rank_query,
    insert_search_keyword_query
)


def fetch_keyword_ranking(keyword):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(get_keyword_rank_query(), (keyword,))
            return cursor.fetchall()
    finally:
        connection.close()


def fetch_week_ranking(year, week):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(get_weekly_rank_query(), (year, year, week,))
            return cursor.fetchall()
    finally:
        connection.close()


def fetch_today_ranking():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(get_daily_rank_query())
            return cursor.fetchall()
    finally:
        connection.close()

def fetch_month_ranking(year, month):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(get_monthly_rank_query(), (int(year), int(month)))
            return cursor.fetchall()
    finally:
        connection.close()


def insert_search_keyword(keyword):
    sql = insert_search_keyword_query()
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(sql, (keyword,))
        conn.commit()
    finally:
        conn.close()

